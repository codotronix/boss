import { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import styles from './WinFrame.module.css'
import { APPS_DETAILS } from '../../../const/APPS_DETAILS'
import useRuntime from '../../../features/procs/useRuntime'
import { WINDOW_SIZES } from '../../../const/WINDOW'

const menus = {
    File: [],
    Menu2: [],
    Menu3: [],
    Menu4: [],
    Menu5: [],
}

const NON_BODY_HEIGHTS = 50
// let isDragging = false  // window is being dragged
let dragPrevPos = null   // { top: val, left: val }

const getWinStyles = (winSize) => {
    // if(winSize === WINDOW_SIZES.DEFAULT || winSize === WINDOW_SIZES.MINIMIZED) {
        
    // }
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

const WinFrame = props => {
    // const { render } = props
    const { appProps, AppComponent, ...restProps } = props
    const { runtimeInfo } = appProps
    const appName = APPS_DETAILS[runtimeInfo.appId].name
    const runtime = useRuntime()
    // persist value in useRef
    const initStyleRef = useRef(getWinStyles(WINDOW_SIZES.DEFAULT))
    // console.log(initStyleRef)
    const [winStyles, setWinStyles] = useState(initStyleRef.current)

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

    const raiseWindowOnTop = () => runtime.raiseWindow(runtimeInfo.runtimeId)

    const onDragStart = (left, top) => {
        // isDragging = true
        dragPrevPos = { left, top }
        raiseWindowOnTop()
    }

    const onDrag = _.throttle((left, top) => {
        if(left===0 && top===0) return

        let leftDiff = left - dragPrevPos.left
        let topDiff = top - dragPrevPos.top

        // adjust position according to the diff
        setWinStyles(s => ({
            ...s, 
            left: s.left + leftDiff,
            top: s.top + topDiff
        }))

        // set new previous drag position
        dragPrevPos = { left, top }
    }, 0)

    const onDragEnd = (left, top) => {
        // if(left===0 && top===0) return
        // if(!dragPrevPos) return

        // // get the diff of dragging
        // let leftDiff = left - dragPrevPos.left
        // let topDiff = top - dragPrevPos.top

        // // adjust position according to the diff
        // setWinStyles(s => ({
        //     ...s, 
        //     left: s.left + leftDiff,
        //     top: s.top + topDiff
        // }))

        // Update this styles/position as default styles/position
        initStyleRef.current = winStyles
        dragPrevPos = null
        // isDragging = false
    }

    // console.log('WinFrame props = ', appProps, restProps)

    const maximize = () => runtime.mize(runtimeInfo.runtimeId, WINDOW_SIZES.MAXIMIZED)
    const minimize = () => runtime.mize(runtimeInfo.runtimeId, WINDOW_SIZES.MINIMIZED)
    const unmaximize = () => runtime.mize(runtimeInfo.runtimeId, WINDOW_SIZES.DEFAULT)
    
    const close = () => {
        const r = window.confirm("Do you really want to close ?")
        if(r) {
            runtime.terminate(runtimeInfo.runtimeId)
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
        >

            <div className={clsx(styles.bar, styles.namebar)}>
                {
                    // Dragging available only in WINDOW_SIZES.DEFAULT
                    runtimeInfo.winSize===WINDOW_SIZES.DEFAULT &&
                    <i 
                        className={clsx("fa-regular fa-hand", styles.dragIco)}
                        draggable="true"
                        onDrag={e => onDrag(e.pageX, e.pageY)}
                        onDragStart={e => onDragStart(e.pageX, e.pageY)}
                        onDragEnd={e => onDragEnd(e.pageX, e.pageY)}
                    ></i>
                }

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
            <div className={clsx(styles.bar, styles.menubar)}>
                {
                    Object.keys(menus).map(m => 
                    <div key={m} className={styles.menu}>
                        {m}
                    </div>)
                }
            </div>

            {/* THE BODY */}
            <div style={{ height: (winStyles.height - NON_BODY_HEIGHTS) }}>
                {/* { render( {command: winState.commandToApp} ) } */}
                <AppComponent {...appProps} />
            </div>
        </div>
    )
}

export default WinFrame