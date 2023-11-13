// The Invisible Component that dynamically hold all the running apps' components
import { useSelector } from "react-redux"
import { MAP_APP_ID_TO_COMPONENT } from "../../../const/MAP_APP_ID_TO_COMPONENT"


const AppsContainer = () => {
    const runningApps = Object.values(useSelector(state => state.procs))

    return (
        <div className="apps_container">
            {
                runningApps.map(a => {
                    const Comp = MAP_APP_ID_TO_COMPONENT[a.appId]
                    if(Comp) return <Comp key={a.runtimeId} runtimeInfo={a} />
                    else return null
                })
            }
        </div>
    )
}

export default AppsContainer