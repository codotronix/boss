import { useState, useEffect, useRef, Suspense } from 'react'
import clsx from 'clsx'
import styles from './WinFrame.module.css'
import { APPS_DETAILS } from '../../../const/APPS_DETAILS'
import useRuntime from '../../../features/procs/useRuntime'
// import useDrag from './useDrag'
import useDragV2 from './useDragV2'
import { WINDOW_SIZES } from '../../../const/WINDOW'
import Menubar from './Menubar'

const NON_BODY_HEIGHTS = 25

const getDefaultWinStyles = (winSize) => {
    if(winSize === WINDOW_SIZES.MAXIMIZED) {
        return () => ({
            width: window.innerWidth,
            height: window.innerHeight
        })()
    }
    else {
        return {
            width: Math.max( 300, Math.floor(window.innerWidth * .7) ),
            height: 300 - NON_BODY_HEIGHTS
        }
    }
}

const getMaximizedStyles = () => ({
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

/**
 * This will render the Menu Component
 * @param {*} menu - This will have the following structure
 * 
    {
        File: {
            "New": { handleClick: Fn },
            "SubMenu 2": { handleClick: Fn },
            "Quit": { handleClick: Fn },
        },
        Edit: {
            "Copy": { handleClick: Fn },
            "Cut": { handleClick: Fn },
            "Paste": { handleClick: Fn },
        }
    }
 */
const renderMenu = (menu) => {
    return (
        <Menubar menu={menu} />
    )
}

const getRandomInitPosition = () => ({
    y: 10 + Math.floor(Math.random()*200),
    x: 10 + Math.floor(Math.random()*100),
})


const WinFrame = props => {
    // const { render } = props
    const { appProps, AppComponent } = props
    const { runtimeInfo } = appProps
    const appName = APPS_DETAILS[runtimeInfo.appId].name
    const runtime = useRuntime()
    // persist value in useRef
    const initStyleRef = useRef(getDefaultWinStyles(WINDOW_SIZES.DEFAULT))

    const initPosRef = useRef(getRandomInitPosition())
    const initSizeRef = useRef({ x: Math.max(window.innerWidth - 300, 300), y: Math.max(window.innerHeight - 200, 400) })
    // console.log(initStyleRef)
    const [winStyles, setWinStyles] = useState(initStyleRef.current)
    
    const dragRef = useRef()
    const resizeRef = useRef()

    // use the useDragV2 custom hook for Dragging and repositioning
    const [ position, setPosition ] = useDragV2(dragRef.current, initPosRef.current)
    const [ size, setSize ] = useDragV2(resizeRef.current, initSizeRef.current)

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
                transform: 'scale(0)'
            }
        }

        setWinStyles(newWinStyle)
    }, 
    [runtimeInfo.winSize])

    const raiseWindowOnTop = () => runtime.raiseWindow(runtimeInfo.runtimeId)

    const maximize = () => {
        runtime.mize(runtimeInfo.runtimeId, WINDOW_SIZES.MAXIMIZED)
        setPosition({ x: 0, y: 0 })
        // store prev position and size, 
        // because we need it to unmaximize
        // initSizeRef.current = size
        // initPosRef.current = position
        // set the new size
        // setSize({ x: window.innerWidth, y: window.innerHeight })
    }

    const minimize = () => {
        runtime.mize(runtimeInfo.runtimeId, WINDOW_SIZES.MINIMIZED)
    }

    const unmaximize = () => {
        runtime.mize(runtimeInfo.runtimeId, WINDOW_SIZES.DEFAULT)
        // setSize(initSizeRef.current)
        // setPosition(initPosRef.current)
    }
    
    const close = () => {
        // const r = window.confirm("Do you really want to close ?")
        // if(r) {
            runtime.terminate(runtimeInfo.runtimeId)
        // }
    }

    const openNewWindow = () => {
        runtime.run(runtimeInfo.appId)
    }

    return (
        <div 
            className={clsx(
                'WinFrame',
                styles.root, 
                (runtimeInfo.winSize===WINDOW_SIZES.MINIMIZED) && styles.minimized, 
                (runtimeInfo.winSize===WINDOW_SIZES.DEFAULT) && styles.defaultSized,
                (runtimeInfo.winSize===WINDOW_SIZES.MAXIMIZED) && styles.maximized,
                )}
            style={{ 
                height: size.y, 
                width: size.x, 
                zIndex: runtimeInfo.zIndex, 
                transform: `translate(${position.x}px, ${position.y}px)` 
            }}
            onClick={raiseWindowOnTop}
            title={ appName || 'Application Window' }
        >

            <div 
                className={clsx(styles.bar, styles.namebar)}
                ref={dragRef}
            >
                <div>{ appName || 'Application' }</div>
                <div className={styles.btns}>
                    { 
                        runtimeInfo.winSize !== WINDOW_SIZES.MAXIMIZED &&
                        <button type='button' onClick={maximize} title="Maximize" className={styles.mizeBtn}>
                            <i className="fa-regular fa-square"></i>
                        </button>
                        
                    }
                    {
                        (runtimeInfo.winSize === WINDOW_SIZES.MAXIMIZED || 
                            runtimeInfo.winSize === WINDOW_SIZES.MINIMIZED) && 
                            <button type='button' onClick={unmaximize} title="Un-Maximize" className={styles.mizeBtn}>
                                <i className="fa-solid fa-down-left-and-up-right-to-center"></i>
                            </button>
                            
                    }
                    <button type='button' onClick={minimize} title="Minimize" className={styles.mizeBtn}>
                        <i className="fa-solid fa-window-minimize"></i>
                    </button>
                    
                    <button type='button' onClick={close} title="Close" className={styles.mizeBtn}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    
                </div>
            </div>
            
            {/* <Menubar menu={menu} handleMenuCommand={handleMenuCommand} /> */}

            {/* THE BODY */}
            <div style={{ height: (size.y - NON_BODY_HEIGHTS) }} className={styles.body}>
                {/* 
                    // Suspense Components could be remotely loaded 
                    // via Webpack Module Federation - Micro-frontend
                 */}
                <Suspense fallback={<LoadingScreen appName={appName} />}>
                    <AppComponent 
                        {...appProps}
                        renderMenu={renderMenu}
                        onClose={close}
                        onNew={openNewWindow}
                    />
                </Suspense>
            </div>
            
            <i 
                className={clsx("fa-solid fa-arrow-up-right-dots", styles.repositionHandle)}
                // draggable="true"
                // onDrag={e => onResize(e.pageX, e.pageY)}
                // onDragStart={e => onResizeStart(e.pageX, e.pageY)}
                // onDragEnd={e => onResizeEnd(e.pageX, e.pageY)}
                ref={resizeRef}
            ></i>
        </div>
    )
}

export default WinFrame