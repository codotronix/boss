import { useSelector, useDispatch } from "react-redux";
import { runApp, terminateApp, mizeApp, raiseWindow as _raiseWindow, 
    getMaxZIndex as _getMaxZIndex } from "./procsSlice";

function useRuntime() {
    const dispatch = useDispatch()
    const runningApps = useSelector(state => state.procs)

    const run = (appId, ...args) => dispatch(runApp({ appId, args }))
    const terminate = runtimeId => dispatch(terminateApp(runtimeId))
    const mize = (runtimeId, winSize) => dispatch(mizeApp({ runtimeId, winSize }))
    const raiseWindow = runtimeId => dispatch(_raiseWindow(runtimeId))
    const getMaxZIndex = () => _getMaxZIndex(runningApps)

    return {
        run, terminate, mize, raiseWindow, getMaxZIndex
    }
}

export default useRuntime

