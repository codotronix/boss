import { useDispatch } from "react-redux";
import { runApp, terminateApp } from "./runtimeSlice";

function useRuntime() {
    const dispatch = useDispatch()

    const run = (appId, ...args) => dispatch(runApp({ appId, args }))
    const terminate = runtimeId => dispatch(terminateApp(runtimeId))

    return {
        run, terminate
    }
}

export default useRuntime

