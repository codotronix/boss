import { useDispatch } from "react-redux";
import { runApp, terminateApp, mizeApp } from "./runtimeSlice";

function useRuntime() {
    const dispatch = useDispatch()

    const run = (appId, ...args) => dispatch(runApp({ appId, args }))
    const terminate = runtimeId => dispatch(terminateApp(runtimeId))
    const mize = (runtimeId, winSize) => dispatch(mizeApp({ runtimeId, winSize }))

    return {
        run, terminate, mize
    }
}

export default useRuntime

