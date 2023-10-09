import axios from 'axios'
import URLS from '../const/urls'

let configData = null

export const initLoadConfigData = async () => {
    if(configData) return configData

    // fetch appDetails
    let appDetails = await axios.get(URLS.APP_DETAILS)
    appDetails = appDetails.data

    // fetch dock
    let dockDetails = await axios.get(URLS.DOCK_DETAILS)
    dockDetails = dockDetails.data

    // dockDetails.apps contains only the IDs of the app
    // let's extract full details of the app from appDetails
    const dockedApps = []
    for(let appId of dockDetails.apps) {
        if(appId in appDetails) dockedApps.push({ appId, ...appDetails[appId] })
    }
    dockDetails["dockedApps"] = dockedApps

    configData = {
        appDetails,
        dockDetails
    }
}

export const getAppConfig = async () => {
    if(!configData) await initLoadConfigData()
    return configData.appDetails
}

export const getDockConfig = async () => {
    if(!configData) await initLoadConfigData()
    return configData.dockDetails
}

