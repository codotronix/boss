import { createSlice } from "@reduxjs/toolkit";
import { type IInstalledApp, DEFAULT_APPS } from "@/const/APPS";

export interface AppsState {
  installedApps: { [appId: string]: IInstalledApp };
}

const initialState: AppsState = {
  installedApps: DEFAULT_APPS,
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
  },
});

export const { installApp, uninstallApp } = appsSlice.actions;
export default appsSlice.reducer;
