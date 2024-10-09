import { createSlice } from "@reduxjs/toolkit";
import { DOCK_POSITION } from "../../const/DOCK";

const initialState = {
    wallpaper: "/boss/assets/img/wallpapers/ai-generated-8293344_1280.jpg",
    dock: {
        position: DOCK_POSITION.BOTTOM,
    }
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeWallpaper: (state, action) => {
            state.wallpaper = action.payload
        },
        changeDockPosition: (state, action) => {
            if (Object.values(DOCK_POSITION).includes(action.payload)) {
                state.dock.position = action.payload
            }
        },
    },
})

export const { changeWallpaper, changeDockPosition } = settingsSlice.actions
export default settingsSlice.reducer