import { createSlice } from "@reduxjs/toolkit";

export interface SystemState {
  isSystemUnLocked: boolean;
}

const initialState: SystemState = {
  isSystemUnLocked: false,
};

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    lockSystem: (state) => {
      state.isSystemUnLocked = false;
    },
    unlockSystem: (state) => {
      state.isSystemUnLocked = true;
    },
  },
});

export const { lockSystem, unlockSystem } = systemSlice.actions;

export default systemSlice.reducer;
