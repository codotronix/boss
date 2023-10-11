import { createSlice } from "@reduxjs/toolkit"
import { APPS_DETAILS } from "../../const/APPS_DETAILS"
/**
 * Runtime will be storing the info on all the apps currently running
 */
// initially no apps will be running
// as do not have the run-with-windos-start functionality yet
let _runtimeIdCounter = 1
const initialState = {
    1: { appId: "RUNTIME", runtimeId: 1, crucial: true }
}

export const runtimeSlice = createSlice({
    name: 'runtime',
    initialState,
    reducers: {
        // request to start / run a new app
        runApp: (state, action) => {
            const { appId, args } = action.payload

            // Check if this app is a singleton i.e. (allowedInstances === 1)
            // Check if already running
            const runningInstancesCount = Object.values(state).filter(a => a.appId === appId).length
            const allowedInstances = APPS_DETAILS[appId].allowedInstances
            
            if(runningInstancesCount === 0 || !allowedInstances || allowedInstances > runningInstancesCount) {
                const runtimeId = ++_runtimeIdCounter
                return {
                    ...state,
                    [runtimeId]: { appId, runtimeId, args }
                }
            }
            return state
        },
        terminateApp: (state, action) => {
            console.log('......')
            const runtimeId = action.payload
            const newState = { ...state }
            // We can terminate only non-crucial apps
            // if not already done and removed
            if(newState[runtimeId] && !newState[runtimeId].crucial) {
                delete newState[runtimeId]
            }
            console.log(newState)
            return newState
        }
    }
})

// Action creators are generated for each case reducer function
export const { runApp, terminateApp } = runtimeSlice.actions

export default runtimeSlice.reducer