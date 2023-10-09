import clsx from 'clsx'
import styles from "./DockIcon.module.css"

const DockIcon = props => {
    const { appId, name, iconClass } = props

    return (
        <div className={styles.root}>
            <i className={clsx(iconClass, styles.ico)} title={name} />
        </div>
    )
}

export default DockIcon