import { createSlice } from "@reduxjs/toolkit";
import { File } from "./File";
import { FILE_TYPE } from "../../const/FILE_CONST";
import ls from "../../services/localStorage";
const KEY_FILE_TREE = 'BOSS/FILE-TREE'

// Initially there will be only THE-ROOT (/)
const initialState = ls.get(KEY_FILE_TREE) || {
    "/": {
        id: "/",
        name: "/",
        fileType: FILE_TYPE.FOLDER, 
        parentId: null,
        children: ['documents', 'file0']
    },
    "documents": {
        id: "documents",
        name: "Documents",
        fileType: FILE_TYPE.FOLDER, 
        parentId: '/',
        children: []
    },
    "file0": {
        id: "file0",
        name: "Hello Boss",
        fileType: FILE_TYPE.FILE, 
        parentId: '/',
        content: "Hello Boss.\nThis is a text file"
    }
} 

ls.set(KEY_FILE_TREE, initialState)

// { id1: File1, id2: File2 ... }

// NOT TO BE USED DIRECTLY
// SHOULD BE ONLY USED BY THE PROVIDED HOOK
export const filesSlice = createSlice({
    name: 'fileSystem',
    initialState,
    reducers: {
        // create file / folder
        create: (state, action) => {
            const { name, parentId, fileType, owner } = action.payload 
            const newState = _create(state, name, parentId, fileType, owner)
            ls.set(KEY_FILE_TREE, newState)
            return newState
        },
    }
})

export const { create } = filesSlice.actions
export default filesSlice.reducer


///////////////// WRITING FUNCTIONS SEPARATELY FOR TESTABILITY ///////////////////////
/**
 * Helper reducer function that takes in the state,
 * does necessary changes to the state and returns a new state
 * @param {*} state 
 * @param {*} name 
 * @param {*} parentId 
 * @param {*} fileType 
 * @param {*} owner 
 * @returns 
 */
export function _create(state, name, parentId, fileType, owner) {
    // File name invalid?
    const VALID_NAME_REGEX = /^[a-zA-Z0-9-._ ]{1,}$/
    if(!name.trim() || !VALID_NAME_REGEX.test(name)) {
        return state
    }
    // Invalid parentId
    // Or parentId is not a folder
    if(!(parentId in state) || state[parentId].fileType !== FILE_TYPE.FOLDER) {
        return state
    }

    // Check for duplicate file names
    if(state[parentId].children.map(fid => state[fid].name).includes(name)) {
        return state
    }

    // Create new New File Object
    const newFile = File(name, parentId, fileType, owner)

    // add this new File to the state
    const newState = {
        ...state,
        [newFile.id]: newFile
    }

    // add this file's id to its parent's children
    if(parentId) {
        newState[parentId] = {
            ...newState[parentId],
            children: [...newState[parentId].children, newFile.id]
        }
    }

    // return this new state
    return newState
}