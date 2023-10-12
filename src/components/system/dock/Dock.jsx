import { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './Dock.module.css'
import DockIcon from './dockIcon/DockIcon'
import MinimizedAppsViewer from './minimizedAppsViewer/MinimizedAppsViewer'
import useRuntime from '../../../features/procs/useRuntime'

const Dock = props => {
    // const { dockDetails } = props
    const [zIndex, setZIndex] = useState(1)
    const apps = useSelector(state => state.apps)
    const dockedApps = Object.values(apps).filter(a => a.docked)
    const runtime = useRuntime()
    
    const onClick = () => {
        setZIndex(runtime.getMaxZIndex()+1)
    }

    return (
        <div className={styles.root} style={{ zIndex }} onClick={onClick}>
            <div className={styles.inner}>
                {
                    dockedApps && dockedApps.map(da => <DockIcon 
                        key={da.appId} {...da}
                    />)
                }
                <MinimizedAppsViewer />
            </div>
        </div>
    )
}

export default Dock