import clsx from 'clsx'
import styles from "./DockIcon.module.css"
// import { useRun } from '../../../../hooks/useRuntime'
import useRuntime from '../../../../features/procs/useRuntime'

const DockIcon = props => {
    const { appId, name, iconClass } = props
    const runtime = useRuntime()
    
    return (
        <button type="button" className={styles.root} onClick={() => runtime.run(appId)} title={name}>
            <i className={clsx(iconClass, styles.ico)} />
        </button>
    )
}

export default DockIcon