import { APPS_DETAILS } from "../../../../const/APPS_DETAILS";
import withWinFrame from "../../withWinFrame";
import styles from "./AppsViewer.module.css"
import clsx from "clsx"
import { useEffect, useState } from "react";
import useRuntime from "../../../../features/procs/useRuntime";
import { WINDOW_SIZES } from "../../../../const/WINDOW";


const AppsViewer = props => {
    const { configMenu, runtimeInfo } = props
    // Filter out AppsView 
    const [apps, setApps] = useState(Object.values(APPS_DETAILS).filter(a => a.appId!== runtimeInfo.appId) )
    const runtime = useRuntime()

    useEffect(() => {
        // Disable menu by calling the configMenu
        configMenu({ hideMenu: true })
    }, [])
    

    const runApp = appId => runtime.run(appId)

    return (
        <div className={styles.root}>
            <div className={styles.inner}>
            {
                apps.map(a => 
                <div 
                    key={a.appId} className={clsx(styles.app, 'flex-c')}
                    onClick={() => runApp(a.appId)}
                >
                    <div className={clsx(styles.figSlot, 'flex-c')}>
                    { a.iconClass && <i className={clsx(a.iconClass, styles.appIco)}></i> }
                    </div>
                    
                    <span className={clsx(styles.appName, 'flex-c')}>{ a.name }</span>
                </div>)
            }
            </div>
        </div>
    )
}

export default withWinFrame(AppsViewer)



