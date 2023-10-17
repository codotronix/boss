// The Invisible Component that dynamically hold all the running apps' components
import { useSelector } from "react-redux"
import { MapAppIdToComp } from "./MapAppIdToComp"


const AppsContainer = () => {
    const runningApps = Object.values(useSelector(state => state.procs))

    return (
        <div className="apps_container">
            {
                runningApps.map(a => {
                    const Comp = MapAppIdToComp[a.appId]
                    if(Comp) return <Comp key={a.runtimeId} runtimeInfo={a} />
                    else return null
                })
            }
        </div>
    )
}

export default AppsContainer