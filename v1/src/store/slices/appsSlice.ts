import { createSlice } from "@reduxjs/toolkit";
import {
  type IInstalledApp,
  type IRunningApp,
  DEFAULT_APPS,
} from "@/const/APPS";

export interface AppsState {
  installedApps: { [appId: string]: IInstalledApp };
  runningApps: { [runId: string]: IRunningApp };
}

const initialState: AppsState = {
  installedApps: DEFAULT_APPS,
  runningApps: {},
};

export const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    installApp: (state, action: { payload: IInstalledApp }) => {
      const app = action.payload;
      state.installedApps[app.appId] = app;
    },
    uninstallApp: (state, action: { payload: { appId: string } }) => {
      const { appId } = action.payload;
      delete state.installedApps[appId];
    },
    runApp: (state, action: { payload: { appId: string } }) => {
      const { appId } = action.payload;

      // Do not run if current running instances exceed allowedInstances
      const installedApp = state.installedApps[appId];
      if (!installedApp) return;

      const currentInstances = Object.values(state.runningApps).filter(
        (app) => app.appId === appId
      ).length;
      if (
        installedApp.allowedInstances !== undefined &&
        currentInstances >= installedApp.allowedInstances
      ) {
        return;
      }

      const runId = `${appId}-${Date.now()}`;
      const runningApp = { runId, appId };
      state.runningApps[runningApp.runId] = runningApp;
    },
    closeApp: (state, action: { payload: { runId: string } }) => {
      const { runId } = action.payload;
      delete state.runningApps[runId];
    },
  },
});

export const { installApp, uninstallApp, runApp, closeApp } = appsSlice.actions;
export default appsSlice.reducer;
