import { APPS_DETAILS } from "../../../../const/APPS_DETAILS";
import withWinFrame from "../../withWinFrame";
import styles from "./AppsViewerApp.module.css"
import clsx from "clsx"
import { useState } from "react";
import useRuntime from "../../../../features/procs/useRuntime";
import TypeToFilter from "../../../common/type-to-filter/TypeToFilter";

const AppsViewerApp = props => {
    const { runtimeInfo, renderMenu, onClose, onNew } = props
    // Filter out AppsView 
    const [apps] = useState(Object.values(APPS_DETAILS).filter(a => a.appId!== runtimeInfo.appId) )
    const runtime = useRuntime()
    const [filteredApps, setFilteredApps] = useState(apps)

    const runApp = appId => {
        // Delay the load / load asyncronously
        // so that this windows click event does not
        // put it on the new app
        // The new app should be on Top of this
        window.setTimeout(() => {
            runtime.run(appId)
        }, 0)
    }

    const createMenu = () => {
        return renderMenu({
            File: {
                "New": { handleClick: onNew },
                "SubMenu 2": { handleClick: () => console.log('SubMenu 2') },
                "Quit": { handleClick: onClose },
            },
            Edit: {
                "Copy": { handleClick: () => console.log('Copy') },
                "Cut": { handleClick: () => console.log('Cut') },
                "Paste": { handleClick: () => console.log('Paste') },
            }
        })
    }

    return (
        <>
        { createMenu() }
        <div className={styles.root}>
            
            <TypeToFilter
                allItems={apps}
                filterKeys={['name', 'keywords']}
                setFilteredItems={setFilteredApps}
            />
            <div className={styles.inner}>
            {
                filteredApps.map(a => 
                <div 
                    key={a.appId} className={clsx(styles.app, 'flex-c')}
                    // onClick={() => runApp(a.appId)}
                    onDoubleClick={() => runApp(a.appId)}
                    title={a.name}
                >
                    <div className={clsx(styles.figSlot, 'flex-c')}>
                    { a.iconClass && <i className={clsx(a.iconClass, styles.appIco)}></i> }
                    </div>
                    
                    <span className={clsx(styles.appName, 'flex-c')}>{ a.name }</span>
                </div>)
            }
            </div>
        </div>
        </>
    )
}

export default withWinFrame(AppsViewerApp)



