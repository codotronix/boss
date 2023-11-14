import { useState } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import styles from './MinimizedAppsViewer.module.css'
import dockIconStyles from "../dockIcon/DockIcon.module.css"
import { WINDOW_SIZES } from '../../../../const/WINDOW'
import MinimizedAppsList from './minimizedAppsList/MinimizedAppsList'

const MinimizedAppsViewer = props => {
    const [ minimizeListVisible, setMinimizeListVisible ] = useState(false)
    const runningApps = useSelector(state => state.procs)
    const minimizedApps = Object.values(runningApps).filter(r => r.winSize === WINDOW_SIZES.MINIMIZED)

    // useEffect(() => {
    //     console.log(thisElRef.current)
    //     console.log('offsetTop=', thisElRef.current.offsetTop)
    //     console.log('offsetHeight=', thisElRef.current.offsetHeight)
    //     console.log('offsetLeft=', thisElRef.current.offsetLeft)
    //     console.log('offsetWidth=', thisElRef.current.offsetWidth)
    // }, 
    // [window.innerWidth])

    return (
        <div className={styles.root}>
            <MinimizedAppsList 
                visible={minimizeListVisible} 
                setVisible={setMinimizeListVisible}
                minimizedApps={minimizedApps}
            />

            <div className={dockIconStyles.root}>
                { 
                    minimizedApps.length > 0 && 
                    <span className={styles.minimizeCount}>{minimizedApps.length}</span>
                }
                <button 
                    type="button" 
                    className={dockIconStyles.root}
                    title="toggle minimized apps"
                    onClick={() => setMinimizeListVisible(!minimizeListVisible)}
                >
                    <i className={clsx("fa-solid fa-bars", dockIconStyles.ico)} ></i>
                </button>
            </div>
        </div>
    )
}

export default MinimizedAppsViewer