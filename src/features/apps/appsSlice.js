import { createSlice } from "@reduxjs/toolkit";
import { appsInitState } from "./appsInitState";

export const appsSlice = createSlice({
    name: 'apps',
    initialState: appsInitState,
    reducers: {
        
    }
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = appsSlice.actions

export default appsSlice.reducer

