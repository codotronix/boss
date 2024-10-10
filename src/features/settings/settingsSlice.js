import { createSlice } from "@reduxjs/toolkit";
import { DOCK_POSITION } from "../../const/DOCK";
import { CLOSE_BTN_POSITION } from "../../const/WINDOW";

const initialState = {
    wallpaper: "/boss/assets/img/wallpapers/ai-generated-8293344_1280.jpg",
    dock: {
        position: DOCK_POSITION.BOTTOM,
    },
    window: {
        closeBtnPosition: CLOSE_BTN_POSITION.RIGHT
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
        changeWindowCloseBtnPosition: (state, action) => {
            if (Object.values(CLOSE_BTN_POSITION).includes(action.payload)) {
                state.window.closeBtnPosition = action.payload
            }
        },
    },
})

export const { changeWallpaper, changeDockPosition, changeWindowCloseBtnPosition } = settingsSlice.actions
export default settingsSlice.reducer