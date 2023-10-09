import styles from './Dock.module.css'
import DockIcon from './dockIcon/DockIcon'

const Dock = props => {
    const { dockDetails } = props

    return (
        <div className={styles.root}>
            <div className={styles.inner}>
                {
                    dockDetails && dockDetails.dockedApps && dockDetails.dockedApps.map(da => <DockIcon 
                        key={da.appId} {...da}
                    />)
                }
            </div>
        </div>
    )
}

export default Dock