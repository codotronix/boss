import { createSlice } from "@reduxjs/toolkit"
import { APPS_DETAILS } from "../apps/APPS_DETAILS"
/**
 * Runtime will be storing the info on all the apps currently running
 */
// initially no apps will be running
// as do not have the run-with-windos-start functionality yet
let _runtimeIdCounter = 1
const initialState = [
    { appId: "RUNTIME", runtimeId: 1, killable: false }
]

export const runtimeSlice = createSlice({
    name: 'runtime',
    initialState,
    reducers: {
        // request to start / run a new app
        run: (state, action) => {
            const { appId, args } = action.payload

            // Check if this app is a singleton i.e. (allowedInstances === 1)
            // Check if already running
            const runningInstancesCount = state.filter(a => a.appId === appId).length
            const allowedInstances = APPS_DETAILS[appId].allowedInstances

            if(runningInstancesCount === 0 || !allowedInstances || allowedInstances > runningInstancesCount) {
                state = [
                    ...state,
                    {
                        appId,
                        runtimeId: ++_runtimeIdCounter,
                        args
                    }
                ]
            }
        }
    }
})