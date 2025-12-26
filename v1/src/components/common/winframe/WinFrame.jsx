import { useRef, Suspense } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import styles from './WinFrame.module.css'
import { APPS_DETAILS } from '../../../const/APPS_DETAILS'
import useRuntime from '../../../features/procs/useRuntime'
// import useDrag from './useDrag'
import useDragV2 from './useDragV2'
import { WINDOW_SIZES } from '../../../const/WINDOW'
import Menubar from './Menubar'

// const NON_BODY_HEIGHTS = 25

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

const getInitSize = () => ({
    x: Math.max(window.innerWidth - 300, 300),
    y: Math.max(window.innerHeight - 200, 400),
})


const WinFrame = props => {
    // const { render } = props
    const { appProps, AppComponent } = props
    const closeBtnPosition = useSelector(state => state.settings.window.closeBtnPosition)
    const { runtimeInfo } = appProps
    const appName = APPS_DETAILS[runtimeInfo.appId].name
    const runtime = useRuntime()

    const initPosRef = useRef(getRandomInitPosition())
    const initSizeRef = useRef(getInitSize())
    
    const dragRef = useRef()
    const resizeRef = useRef()

    // use the useDragV2 custom hook for Dragging and repositioning
    const [ position ] = useDragV2(dragRef.current, initPosRef.current)
    const [ size ] = useDragV2(resizeRef.current, initSizeRef.current)

    const raiseWindowOnTop = () => runtime.raiseWindow(runtimeInfo.runtimeId)

    const maximize = () => runtime.mize(runtimeInfo.runtimeId, WINDOW_SIZES.MAXIMIZED)
    const minimize = () => runtime.mize(runtimeInfo.runtimeId, WINDOW_SIZES.MINIMIZED)
    const unmaximize = () => runtime.mize(runtimeInfo.runtimeId, WINDOW_SIZES.DEFAULT)
    
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

            {/* Title Bar */}
            <div className={clsx(styles.bar, styles.titlebar, styles[closeBtnPosition])}>
                <div className={styles.apptitle}>
                    { appName || 'Application' }
                </div>
                {/* Just a transparent place to hold and drag -- Hide it when Maximized */}
                <div className={styles.dragHangle} ref={dragRef}></div>

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

            {/* THE BODY */}
            <div className={styles.body}>
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
            
            {/* The Status Bar At the Bottom */}
            <div className={styles.statusbar}>
                <i 
                    className={clsx("fa-solid fa-arrow-up-right-dots", styles.repositionHandle)}
                    // draggable="true"
                    // onDrag={e => onResize(e.pageX, e.pageY)}
                    // onDragStart={e => onResizeStart(e.pageX, e.pageY)}
                    // onDragEnd={e => onResizeEnd(e.pageX, e.pageY)}
                    ref={resizeRef}
                ></i>
            </div>
        </div>
    )
}

export default WinFrame