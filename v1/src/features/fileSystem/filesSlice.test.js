import { FILE_TYPE } from "../../const/FILE_CONST"
import { _create } from "./filesSlice"

// Test State
// Initially there will be only THE-ROOT (/)
const initialState = {
    "/": {
        id: "/",
        name: "/",
        fileType: FILE_TYPE.FOLDER, 
        parentId: null,
        children: []
    }
}

// Another test state
const state2 = {
    "/": {
        id: "/",
        name: "/",
        fileType: FILE_TYPE.FOLDER, 
        parentId: null,
        children: ['dirA', 'file1']
    },
    "dirA": {
        id: "dirA",
        name: "dir A",
        fileType: FILE_TYPE.FOLDER, 
        parentId: "/",
        children: []
    },
    "file1": {
        id: "file1",
        name: "File 1",
        fileType: FILE_TYPE.FILE, 
        parentId: "/"
    },
} 

describe('Test new file creation', () => {
    
    it('Should create a new file under Root', () => {
        const newState = _create(initialState, 'FileA', '/', FILE_TYPE.FILE, '')
        const newFileId = Object.keys(newState).filter(k => k!=='/')[0]
        
        const expectedState = {
            "/": {
                id: "/",
                name: "/",
                fileType: FILE_TYPE.FOLDER, 
                parentId: null,
                children: [newFileId]
            },
            [newFileId]: {
                id: newFileId,
                name: "FileA",
                fileType: FILE_TYPE.FILE,
                parentId: "/",
                children: null
            }
        }

        expect(newState).toMatchObject(expectedState)
    })

    it('Should create a new folder under Root', () => {
        const newState = _create(initialState, 'Dir X', '/', FILE_TYPE.FOLDER, '')
        
        const newDirId = Object.keys(newState).filter(k => k!=='/')[0]
        
        const expectedState = {
            "/": {
                id: "/",
                name: "/",
                fileType: FILE_TYPE.FOLDER, 
                parentId: null,
                children: [newDirId]
            },
            [newDirId]: {
                id: newDirId,
                name: "Dir X",
                fileType: FILE_TYPE.FOLDER,
                parentId: "/",
                children: []
            }
        }

        expect(newState).toMatchObject(expectedState)
    })

    it('Should create file and folder under another dir', () => {
        // create a file
        let newState = _create(state2, 'File X', 'dirA', FILE_TYPE.FILE, '')
        // now create a folder
        newState = _create(newState, 'Dir X', 'dirA', FILE_TYPE.FILE, '')

        // total count should be 2
        expect(newState['dirA'].children.length).toBe(2)
    })

    it('Should NOT create duplicate file names', () => {
        // create a file
        let newState = _create(state2, 'File X', 'dirA', FILE_TYPE.FILE, '')
        // now try to repeat 3 times
        newState = _create(newState, 'File X', 'dirA', FILE_TYPE.FILE, '')
        newState = _create(newState, 'File X', 'dirA', FILE_TYPE.FILE, '')
        newState = _create(newState, 'File X', 'dirA', FILE_TYPE.FILE, '')

        // total count should ONLY be 1
        expect(newState['dirA'].children.length).toBe(1)

        // Change the file name and try to create 2 more
        newState = _create(newState, 'File Y', 'dirA', FILE_TYPE.FILE, '')
        newState = _create(newState, 'File Z', 'dirA', FILE_TYPE.FILE, '')

        // total count should ONLY be 3
        expect(newState['dirA'].children.length).toBe(3)
    })

    it('Should do nothing if file name is blank', () => {
        let newState = _create(state2, '', 'dirA', FILE_TYPE.FILE, '')
        expect(newState).toStrictEqual(state2)
    })

    it('File name should not have special characters', () => {
        let newState = _create(state2, 'file123!', 'dirA', FILE_TYPE.FILE, '')
        expect(newState).toStrictEqual(state2)

        newState = _create(state2, 'file123@', 'dirA', FILE_TYPE.FILE, '')
        expect(newState).toStrictEqual(state2)

        newState = _create(state2, 'file123#', 'dirA', FILE_TYPE.FILE, '')
        expect(newState).toStrictEqual(state2)

        newState = _create(state2, 'file123$', 'dirA', FILE_TYPE.FILE, '')
        expect(newState).toStrictEqual(state2)

        newState = _create(state2, 'file123^', 'dirA', FILE_TYPE.FILE, '')
        expect(newState).toStrictEqual(state2)

        newState = _create(state2, 'file123&', 'dirA', FILE_TYPE.FILE, '')
        expect(newState).toStrictEqual(state2)

        newState = _create(state2, 'file123*', 'dirA', FILE_TYPE.FILE, '')
        expect(newState).toStrictEqual(state2)

        newState = _create(state2, 'file123>', 'dirA', FILE_TYPE.FILE, '')
        expect(newState).toStrictEqual(state2)

        newState = _create(state2, 'file123<', 'dirA', FILE_TYPE.FILE, '')
        expect(newState).toStrictEqual(state2)

        newState = _create(state2, 'file123/', 'dirA', FILE_TYPE.FILE, '')
        expect(newState).toStrictEqual(state2)

        newState = _create(state2, 'file123\\', 'dirA', FILE_TYPE.FILE, '')
        expect(newState).toStrictEqual(state2)
    })

    it('Should do nothing if folder Id invalid', () => {
        // create a file inside a non existent directory
        let newState = _create(state2, 'File X', 'dirA-Non-Existent', FILE_TYPE.FILE, '')
        expect(newState).toStrictEqual(state2)
    })

    it('Should not create a file inside a file', () => {
        // create a file inside a file
        let newState = _create(state2, 'File X', 'file1', FILE_TYPE.FILE, '')
        expect(newState).toStrictEqual(state2)
    })
})