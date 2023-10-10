import { createSlice } from "@reduxjs/toolkit";
import { APPS_DETAILS } from "./APPS_DETAILS";

export const appsSlice = createSlice({
    name: 'apps',
    initialState: APPS_DETAILS,
    reducers: {
        
    }
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = appsSlice.actions

export default appsSlice.reducer

