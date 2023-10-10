// The Invisible Component that dynamically hold all the running apps' components
import { useSelector } from "react-redux"
import { WelcomeApp } from '../../applications'

const mapAppIdxComp = {
    'welcomeApp': WelcomeApp
}

const AppsContainer = () => {
    const runningApps = useSelector(state => state.runtime)
    console.log('runningApps = ', runningApps)
    return (
        <div>
            {
                runningApps.map(a => {
                    const Comp = mapAppIdxComp[a.appId]
                    if(Comp) return <Comp key={a.runtimeId} args={a.args} />
                    else return null
                })
            }
            
        </div>
    )
}

export default AppsContainer