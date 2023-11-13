import { APPS_DETAILS } from "../../../../const/APPS_DETAILS";
import withWinFrame from "../../withWinFrame";
import styles from "./AppsViewerApp.module.css"
import clsx from "clsx"
import { useEffect, useState } from "react";
import useRuntime from "../../../../features/procs/useRuntime";


const AppsViewerApp = props => {
    const { configMenu, runtimeInfo } = props
    // Filter out AppsView 
    const [apps] = useState(Object.values(APPS_DETAILS).filter(a => a.appId!== runtimeInfo.appId) )
    const runtime = useRuntime()

    useEffect(() => {
        // Disable menu by calling the configMenu
        configMenu({ hideMenu: true })
    },
    [configMenu])
    

    const runApp = appId => {
        // Delay the load / load asyncronously
        // so that this windows click event does not
        // put it on the new app
        // The new app should be on Top of this
        window.setTimeout(() => {
            runtime.run(appId)
        }, 0)
    }

    return (
        <div className={styles.root}>
            <div className={styles.inner}>
            {
                apps.map(a => 
                <div 
                    key={a.appId} className={clsx(styles.app, 'flex-c')}
                    // onClick={() => runApp(a.appId)}
                    onDoubleClick={() => runApp(a.appId)}
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

export default withWinFrame(AppsViewerApp)



