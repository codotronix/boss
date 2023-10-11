import clsx from 'clsx'
import styles from "./DockIcon.module.css"
// import { useRun } from '../../../../hooks/useRuntime'
import useRuntime from '../../../../features/runtime/useRuntime'

const DockIcon = props => {
    const { appId, name, iconClass } = props
    const runtime = useRuntime()
    

    return (
        <div className={styles.root} onClick={() => runtime.run(appId)}>
            <i className={clsx(iconClass, styles.ico)} title={name} />
        </div>
    )
}

export default DockIcon