import { createSlice } from "@reduxjs/toolkit";
import {
  type IInstalledApp,
  type IRunningApp,
  DEFAULT_APPS,
} from "@/const/APPS";
import { WINDOW_SIZES } from "@/const/WINFRAME";

export interface AppsState {
  installedApps: { [appId: string]: IInstalledApp };
  runningApps: { [runId: string]: IRunningApp };
}

const initialState: AppsState = {
  installedApps: DEFAULT_APPS,
  runningApps: {},
};

export const getHighestZIndex = (runningApps: {
  [runId: string]: IRunningApp;
}) => {
  return Math.max(0, ...Object.values(runningApps).map((app) => app.zIndex));
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
      const width = Math.min(800, window.innerWidth);
      const height = Math.min(600, window.innerHeight);
      const x = Math.floor(Math.random() * (window.innerWidth - width));
      const y = Math.floor(Math.random() * (window.innerHeight - height));
      const zIndex = getHighestZIndex(state.runningApps) + 1;
      const runningApp = {
        runId,
        appId,
        windowSize: WINDOW_SIZES.SCALED,
        prevWindowSize: WINDOW_SIZES.SCALED,
        x,
        y,
        height,
        width,
        zIndex,
      };
      state.runningApps[runningApp.runId] = runningApp;
    },

    closeApp: (state, action: { payload: { runId: string } }) => {
      const { runId } = action.payload;
      delete state.runningApps[runId];
    },

    mizeApp: (
      state,
      action: { payload: { runId: string; windowSize: string } }
    ) => {
      const { runId, windowSize } = action.payload;
      // check if windowSize is valid
      if (!Object.values(WINDOW_SIZES).includes(windowSize)) {
        return;
      }

      // if minimizing, store previous size
      if (windowSize === WINDOW_SIZES.MINIMIZED) {
        state.runningApps[runId].prevWindowSize =
          state.runningApps[runId].windowSize;
      }

      // if restoring from minimized, revert to previous size
      if (windowSize === WINDOW_SIZES.RESTORE) {
        state.runningApps[runId].windowSize =
          state.runningApps[runId].prevWindowSize;
      } else {
        state.runningApps[runId].windowSize = windowSize;
      }

      // bring to front
      state.runningApps[runId].zIndex = getHighestZIndex(state.runningApps) + 1;
    },

    bringAppToFront: (state, action: { payload: { runId: string } }) => {
      const { runId } = action.payload;
      const heighestZIndex = getHighestZIndex(state.runningApps);

      // No action needed if already on top
      if (state.runningApps[runId].zIndex === heighestZIndex) return;
      state.runningApps[runId].zIndex = heighestZIndex + 1;
    },
  },
});

export const {
  installApp,
  uninstallApp,
  runApp,
  closeApp,
  mizeApp,
  bringAppToFront,
} = appsSlice.actions;
export default appsSlice.reducer;
