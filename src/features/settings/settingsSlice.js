import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wallpaper: "/boss/assets/img/wallpapers/ai-generated-8293344_1280.jpg",
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeWallpaper: (state, action) => {
            state.wallpaper = action.payload
        },
    },
})

export const { changeWallpaper } = settingsSlice.actions
export default settingsSlice.reducer