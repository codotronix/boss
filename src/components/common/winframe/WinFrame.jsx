import { useState, useEffect, useRef, Suspense } from 'react'
import clsx from 'clsx'
import styles from './WinFrame.module.css'
import { APPS_DETAILS } from '../../../const/APPS_DETAILS'
import useRuntime from '../../../features/procs/useRuntime'
import useDrag from './useDrag'
import { WINDOW_SIZES } from '../../../const/WINDOW'
import Menubar from './Menubar'
import { DEFAULT_MENU, MENU_COMMANDS } from './MENU_CONST'

const NON_BODY_HEIGHTS = 50

const getWinStyles = (winSize) => {
    if(winSize === WINDOW_SIZES.MAXIMIZED) {
        return () => ({
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        })()
    }
    else {
        return {
            top: 10 + Math.floor(Math.random()*200),
            left: 10 + Math.floor(Math.random()*100),
            width: Math.max( 300, Math.floor(window.innerWidth * .7) ),
            height: 300 + NON_BODY_HEIGHTS
        }
    }
}

const getMaximizedStyles = () => ({
    top: 0,
    left: 0,
    width: window.innerWidth,
    height: window.innerHeight
})

const LoadingScreen = ({ appName }) => {
    return (
        <div className={styles.loadingComp}>
            {appName || 'The App'} is Loading ...
        </div>
    )
}

const WinFrame = props => {
    // const { render } = props
    const { appProps, AppComponent } = props
    const { runtimeInfo } = appProps
    const appName = APPS_DETAILS[runtimeInfo.appId].name
    const runtime = useRuntime()
    // persist value in useRef
    const initStyleRef = useRef(getWinStyles(WINDOW_SIZES.DEFAULT))
    // console.log(initStyleRef)
    const [winStyles, setWinStyles] = useState(initStyleRef.current)
    const thisWinRef = useRef()
    const [menu, setMenu] = useState(DEFAULT_MENU)
    const [menuCommand, setMenuCommand] = useState('')

    // use the useDrag custom hook for Dragging and repositioning
    const { posDiff, onDragStart: _onDragStart, onDrag, onDragEnd } = useDrag(thisWinRef.current)

    // use the useDrag custom hook for Resizing WinFrame
    // alias all the names to avoid conflict with the normal drag to reposition
    const { posDiff: sizeDiff, 
            onDragStart: onResizeStart, 
            onDrag: onResize, 
            onDragEnd: onResizeEnd } = useDrag()

    // Update styles based on Window Maximize / Minimize / Default
    useEffect(() => {
        // if(isDragging) return
        let newWinStyle = {...initStyleRef.current}
        if(runtimeInfo.winSize === WINDOW_SIZES.MAXIMIZED) {
            newWinStyle = getMaximizedStyles()
        }

        if(runtimeInfo.winSize === WINDOW_SIZES.MINIMIZED) {
            newWinStyle = {
                ...newWinStyle,
                top: window.innerHeight - 100,
                left: 200,
                transform: 'scale(0)'
            }
        }

        setWinStyles(newWinStyle)
    }, 
    [runtimeInfo.winSize])

    // Whenever there is a positionDiff due to dargging
    useEffect(() => {
        // update the new position
        setWinStyles(s => ({
            ...s, 
            left: s.left + posDiff.leftDiff,
            top: s.top + posDiff.topDiff
        }))
    }, 
    [posDiff])


    // Whenever WinFrame is resized using the resize handle at bottom right
    useEffect(() => {
        // update the new position
        setWinStyles(s => ({
            ...s, 
            width: s.width + sizeDiff.leftDiff,
            height: s.height + sizeDiff.topDiff
        }))
    }, 
    [sizeDiff])

    const handleMenuCommand = cmd => {
        switch(cmd) {
            case MENU_COMMANDS.NEW_WINDOW:
                window.setTimeout(() => {
                    runtime.run(runtimeInfo.appId)
                }, 0)
                break
            case MENU_COMMANDS.CLOSE_WINDOW:
                runtime.terminate(runtimeInfo.runtimeId)
                break
            default:
                setMenuCommand(cmd)
        }
    }

    const raiseWindowOnTop = () => runtime.raiseWindow(runtimeInfo.runtimeId)

    const onDragStart = (left, top, e) => {
        _onDragStart(left, top, e)
        raiseWindowOnTop()
    }

    const maximize = () => runtime.mize(runtimeInfo.runtimeId, WINDOW_SIZES.MAXIMIZED)
    const minimize = () => runtime.mize(runtimeInfo.runtimeId, WINDOW_SIZES.MINIMIZED)
    const unmaximize = () => runtime.mize(runtimeInfo.runtimeId, WINDOW_SIZES.DEFAULT)
    
    const close = () => {
        // const r = window.confirm("Do you really want to close ?")
        // if(r) {
            runtime.terminate(runtimeInfo.runtimeId)
        // }
    }

    /**
     * 
     * @param {Object} MenuConfig | { hideMenu: boolean, menu: { id1: subMenuArr1, id: subMenuArr2 }
     */
    const configMenu = MenuConfig => {
        // hide the menu?
        if(MenuConfig.hideMenu) setMenu(null)
        // else merge the menu
        else {

        }
    }

    return (
        <div 
            className={clsx(
                styles.root, 
                (runtimeInfo.winSize===WINDOW_SIZES.MINIMIZED) && styles.minimized, 
                (runtimeInfo.winSize===WINDOW_SIZES.DEFAULT) && styles.defaultSized
                )}
            style={{ ...winStyles, zIndex: runtimeInfo.zIndex }}
            onClick={raiseWindowOnTop}
            ref={thisWinRef}
        >

            <div 
                className={clsx(styles.bar, styles.namebar)}
                draggable="true"
                onDrag={e => onDrag(e.pageX, e.pageY)}
                onDragStart={e => onDragStart(e.pageX, e.pageY, e)}
                onDragEnd={e => onDragEnd(e.pageX, e.pageY)}
            >
                <div>{ appName || 'Application' }</div>
                <div className={styles.btns}>
                    { 
                        runtimeInfo.winSize !== WINDOW_SIZES.MAXIMIZED &&
                        <i className="fa-regular fa-square" onClick={maximize}></i>
                    }
                    {
                        (runtimeInfo.winSize === WINDOW_SIZES.MAXIMIZED || 
                            runtimeInfo.winSize === WINDOW_SIZES.MINIMIZED) && 
                            <i className="fa-solid fa-down-left-and-up-right-to-center" onClick={unmaximize}></i>
                    }
                    <i className="fa-solid fa-window-minimize" onClick={minimize}></i>
                    <i className="fa-solid fa-xmark" onClick={close}></i>
                </div>
            </div>
            
            <Menubar menu={menu} handleMenuCommand={handleMenuCommand} />

            {/* THE BODY */}
            <div style={{ height: (winStyles.height - NON_BODY_HEIGHTS) }} className={styles.body}>
                {/* 
                    // Suspense Components could be remotely loaded 
                    // via Webpack Module Federation - Micro-frontend
                 */}
                <Suspense fallback={<LoadingScreen appName={appName} />}>
                    <AppComponent 
                        {...appProps} 
                        configMenu={configMenu}
                        menuCommand={menuCommand}
                    />
                </Suspense>
            </div>
            
            <i 
                className={clsx("fa-solid fa-arrow-up-right-dots", styles.repositionHandle)}
                draggable="true"
                onDrag={e => onResize(e.pageX, e.pageY)}
                onDragStart={e => onResizeStart(e.pageX, e.pageY)}
                onDragEnd={e => onResizeEnd(e.pageX, e.pageY)}
            ></i>
        </div>
    )
}

export default WinFrame