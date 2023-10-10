import { useDispatch } from "react-redux";
import { run as runApp, terminate } from "../store/features/runtime/runtimeSlice";

function useRuntime() {
    const dispatch = useDispatch()

    const run = (appId, ...args) => dispatch(runApp({ appId, args }))

    return {
        run
    }
}

export default useRuntime

