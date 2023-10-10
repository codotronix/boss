import { useReducer } from 'react'
import clsx from 'clsx'
import styles from './WinFrame.module.css'

const menus = {
    File: [],
    Menu2: [],
    Menu3: [],
    Menu4: [],
    Menu5: [],
}

export const WINDOW_SIZES = {
    UNMAXIMIZE: 'scalable_sized_window',
    MAXIMIZED: 'maximum_sized_window',
    MINIMIZED: 'MINIMUM_sized_window',
}

// height taken by the headers
const NON_BODY_HEIGHTS = 50

const initWinState = {
    top: 10 + Math.floor(Math.random()*200),
    left: 10 + Math.floor(Math.random()*100),
    width: Math.max( 300, Math.floor(window.innerWidth * .7) ),
    height: 300 + NON_BODY_HEIGHTS,
    size_status: WINDOW_SIZES.DEFAULT,
    commandToApp: ''    // commands that need to send to the app inside this winFrame 
}

const WIN_ACTION_TYPES = {
    MAXIMIZE: 'MAXIMIZE',
    MINIMIZE: 'MINIMIZE',
    UNMAXIMIZE: 'UNMAXIMIZE'
}

const reducer = (state, action) => {
    const { type, payload } = action

    switch(type) {
        case WIN_ACTION_TYPES.MAXIMIZE: {
            return {
                ...state,
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
                size_status: WINDOW_SIZES.MAXIMIZED
            }
        }
        case WIN_ACTION_TYPES.UNMAXIMIZE: {
            return {
                ...state,
                ...initWinState
            }
        }
        default: {
            return state
        }
    }
}

const WinFrame = props => {
    // const { render } = props
    const { appProps, AppComponent } = props
    const [winState, dispatchCommand] = useReducer(reducer, initWinState)

    const dynamicStyles = {
        top: winState.top,
        left: winState.left,
        width: winState.width,
        height: winState.height
    }
    
    const maximize = () => {
        dispatchCommand({ type: WIN_ACTION_TYPES.MAXIMIZE })
    }
    const unmaximize = () => {
        dispatchCommand({ type: WIN_ACTION_TYPES.UNMAXIMIZE })
    }

    return (
        <div className={styles.root} style={dynamicStyles}>
            <div className={clsx(styles.bar, styles.namebar)}>
                <div>WinFrame</div>
                <div className={styles.btns}>
                    { 
                        winState.size_status !== WINDOW_SIZES.MAXIMIZED &&
                        <i className="fa-regular fa-square" onClick={maximize}></i>
                    }
                    {
                        (winState.size_status === WINDOW_SIZES.MAXIMIZED || 
                            winState.size_status === WINDOW_SIZES.MINIMIZED) && 
                            <i className="fa-solid fa-down-left-and-up-right-to-center" onClick={unmaximize}></i>
                    }
                    <i className="fa-solid fa-window-minimize"></i>
                    <i className="fa-solid fa-xmark"></i>
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
            <div style={{ height: (winState.height - NON_BODY_HEIGHTS) }}>
                {/* { render( {command: winState.commandToApp} ) } */}
                <AppComponent />
            </div>
        </div>
    )
}

export default WinFrame