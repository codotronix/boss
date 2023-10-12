import { useState } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import styles from './MinimizedAppsViewer.module.css'
import dockIconStyles from "../dockIcon/DockIcon.module.css"
import { WINDOW_SIZES } from '../../../../const/WINDOW'
import MinimizedAppsList from './minimizedAppsList/MinimizedAppsList'

const MinimizedAppsViewer = props => {
    const [ minimizeListVisible, setMinimizeListVisible ] = useState(false)
    const runtime = useSelector(state => state.runtime)
    const minimizedApps = Object.values(runtime).filter(r => r.winSize === WINDOW_SIZES.MINIMIZED)

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
                <i className={clsx("fa-solid fa-bars", dockIconStyles.ico)} 
                    onClick={() => setMinimizeListVisible(!minimizeListVisible)}
                ></i>
            </div>
        </div>
    )
}

export default MinimizedAppsViewer