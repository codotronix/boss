import clsx from 'clsx'
import styles from './MinimizedAppsList.module.css'
import { APPS_DETAILS } from '../../../../../const/APPS_DETAILS'
import { WINDOW_SIZES } from '../../../../../const/WINDOW'
import useRuntime from '../../../../../features/procs/useRuntime'

const MinimizedAppsList = props => {
    const { visible, setVisible, minimizedApps } = props
    const runtime = useRuntime()

    const onAppClick = (runtimeId) => {
        setVisible(false)
        runtime.mize(runtimeId, WINDOW_SIZES.MAXIMIZED)
        runtime.raiseWindow(runtimeId)
    }

    const onAppClose = (runtimeId) => {
        // setVisible(false)
        runtime.terminate(runtimeId)
    }

    return (
        <div className={clsx(styles.root, !visible && 'hidden')}>
            <ul className={styles.inner}>
                { 
                    (!minimizedApps || minimizedApps.length === 0) && 
                    <li className='p-10'>No minimized apps</li>
                }
                {
                    minimizedApps && minimizedApps.map(a => 
                    <li key={a.runtimeId}>
                        <span 
                            className={styles.appName}
                            onClick={() => onAppClick(a.runtimeId)}
                        >
                            { APPS_DETAILS[a.appId].name }
                        </span>
                        <i 
                            className={clsx("fa-solid fa-xmark", styles.closeIco)}
                            title='Close App'
                            onClick={() => onAppClose(a.runtimeId)}
                        ></i>
                    </li>)
                }
            </ul>
        </div>
    )
}

export default MinimizedAppsList