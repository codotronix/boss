import { useSelector } from 'react-redux'
import styles from './Dock.module.css'
import DockIcon from './dockIcon/DockIcon'

const Dock = props => {
    // const { dockDetails } = props
    const apps = useSelector(state => state.apps)
    const dockedApps = Object.values(apps).filter(a => a.docked)

    return (
        <div className={styles.root}>
            <div className={styles.inner}>
                {
                    dockedApps && dockedApps.map(da => <DockIcon 
                        key={da.appId} {...da}
                    />)
                }
            </div>
        </div>
    )
}

export default Dock