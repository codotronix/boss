// The Invisible Component that dynamically hold all the running apps' components
import { useSelector } from "react-redux"
import { MapAppIdToComp } from "./MapAppIdToComp"


const AppsContainer = () => {
    const runningApps = Object.values(useSelector(state => state.procs))
    console.log('runningApps = ', runningApps)

    // const onMouseMove = e => {
    //     // console.log('onMouseMove = ', e)
    // }
    // const onMouseDown = e => {
    //     console.log('onMouseDown = ', e)
    // }
    // const onMouseUp = e => {
    //     console.log('onMouseUp = ', e)
    // }

    return (
        <div>
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