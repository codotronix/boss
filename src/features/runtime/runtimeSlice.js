import { createSlice } from "@reduxjs/toolkit"
import { APPS_DETAILS, APP_DISPLAY_TYPE } from "../../const/APPS_DETAILS"
import { WINDOW_SIZES } from "../../const/WINDOW"
/**
 * Runtime will be storing the info on all the apps currently running
 */
// initially no apps will be running
// as do not have the run-with-windos-start functionality yet
let _runtimeIdCounter = 1


/**
 * @typedef {Object} RuntimeObject
 * @property {number} runtimeId - The unique runtime Id
 * @property {string} appId - The uniq app Id per app from APPS_DETAILS
 * @property {boolean} crucial - Killable or Not?
 * @property {string} winSize - 'MINIMIZED' / 'MAXIMIZED' / 'DEFAULT'
 */

const initialState = {
    1: { appId: "RUNTIME", runtimeId: 1, crucial: true, }
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
            const appDetail = APPS_DETAILS[appId]
            const allowedInstances = appDetail.allowedInstances
            
            if(runningInstancesCount === 0 || !allowedInstances || allowedInstances > runningInstancesCount) {
                // let's create a new runtime object
                const runtimeId = ++_runtimeIdCounter
                const newRuntimeObj = { appId, runtimeId, args }
                // give a default winSize if window type app
                if(appDetail.displayType === APP_DISPLAY_TYPE.WINDOW) {
                    newRuntimeObj.winSize = WINDOW_SIZES.DEFAULT
                }

                return {
                    ...state,
                    [runtimeId]: newRuntimeObj
                }
            }
            return state
        },
        terminateApp: (state, action) => {
            const runtimeId = action.payload
            
            // We can terminate only non-crucial apps
            // if not already done and removed
            if(state[runtimeId] && !state[runtimeId].crucial) {
                const newState = { ...state }
                delete newState[runtimeId]
                return newState
            }
            return state
        },
        // maxi-mize, mini-mize, unmaxi-mize
        mizeApp: (state, action) => {
            console.log('mizeApp', action)
            const { runtimeId, winSize } = action.payload
            const runtimeObj = state[runtimeId]
            const appDetail = APPS_DETAILS[runtimeObj.appId]
            if(appDetail.displayType === APP_DISPLAY_TYPE.WINDOW) {
                // check if the sent winSize is valid
                if(Object.values(WINDOW_SIZES).includes(winSize)) {
                    // do the actual work
                    const modifiedRto = {
                        ...runtimeObj,
                        winSize
                    }
                    return {
                        ...state,
                        [runtimeId]: modifiedRto
                    }
                }
            }
            else {
                // log this exceptional attempt to 
                console.log('The display type of this app is ', appDetail.displayType)
            }
            return state
        }
    }
})

// Action creators are generated for each case reducer function
export const { runApp, terminateApp, mizeApp } = runtimeSlice.actions

export default runtimeSlice.reducer