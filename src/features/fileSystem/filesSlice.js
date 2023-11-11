import { createSlice } from "@reduxjs/toolkit";
import { File } from "./File";

const initialState = {} // { id1: File1, id2: File2 ... }

// NOT TO BE USED DIRECTLY
// SHOULD BE ONLY USED BY THE PROVIDED HOOK
export const filesSlice = createSlice({
    name: 'fileSystem',
    initialState,
    reducers: {
        // create file / folder
        create: (state, action) => {
            const { name, parentId, fileType, owner } = action.payload 

            const newFile = File(name, parentId, fileType, owner)

            // add this new File to the state
            const newState = {
                ...state,
                [newFile.Id]: newFile
            }

            // add this file's id to its parent's children
            if(parentId) {
                newState[parentId] = {
                    ...newState[parentId],
                    children: [...newState[parentId].children, newFile.Id]
                }
            }

            return newState
        },

    }
})

export const { create } = filesSlice.actions
export default filesSlice.reducer