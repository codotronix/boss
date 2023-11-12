import { _getPathTill, _getPathArrTill } from "./useFileSystem"
import { FILE_TYPE } from "../../const/FILE_CONST"

/**
 *                  / (root)
 *                  |
 *    ________________________________
 *    |         |           |        |
 *  file1     dir1        file2     dir2
 *              |                     |
 *        _____________             dir2X
 *        |           |               |
 *       dir1A     file1A           dir2XG
 * 
 * */
const _files = {
    "/": { 
        name: "/",
        fileType: FILE_TYPE.FOLDER, 
        parentId: null,
        children: ['file1', 'file2', 'dir1', 'dir2']
    },
    "file1": { 
        name: "file 1", 
        fileType: FILE_TYPE.FILE, 
        parentId: "/"
    },
    "file2": { 
        name: "file 2", 
        fileType: FILE_TYPE.FILE, 
        parentId: "/"
    },
    "dir1": { 
        name: "dir 1", 
        fileType: FILE_TYPE.FOLDER, 
        parentId: "/",
        children: ['file1A', 'dir1A']
    },
    "file1A": { 
        name: "file 1 A", 
        fileType: FILE_TYPE.FILE, 
        parentId: "dir1"
    },
    "dir1A": { 
        name: "dir-1-A", 
        fileType: FILE_TYPE.FOLDER, 
        parentId: "dir1",
        children: []
    },
    "dir2": { 
        name: "dir 2",
        fileType: FILE_TYPE.FOLDER, 
        parentId: "/",
        children: ['dir2X']
    },
    "dir2X": { 
        name: "dir 2X",
        fileType: FILE_TYPE.FOLDER, 
        parentId: "dir2",
        children: ['dir2XG']
    },
    "dir2XG": { 
        name: "dir 2X G",
        fileType: FILE_TYPE.FOLDER, 
        parentId: "dir2X",
        children: []
    },
}


describe('Testing useFileSystem', () => {

    test('_getPathTill - return proper pathname till root', () => {
        const path = _getPathTill(_files, '/')
        expect(path).toBe("/")
    })

    test('_getPathTill - return proper pathname till given file', () => {
        const path = _getPathTill(_files, 'file1A')
        expect(path).toBe("/dir 1/file 1 A")
    })

    test('_getPathTill - return proper pathname till given folder', () => {
        const path = _getPathTill(_files, 'dir2XG')
        expect(path).toBe("/dir 2/dir 2X/dir 2X G")
    })

    test('_getPathArrTill - return proper path segments till root', () => {
        const pathSeg = _getPathArrTill(_files, '/')
        expect(pathSeg).toStrictEqual([{ id: "/", name: "/" }])
    })

    test('_getPathArrTill - return proper path segments till given file', () => {
        const pathSeg = _getPathArrTill(_files, 'file1A')
        expect(pathSeg).toStrictEqual([
            { id: "/", name: "/" },
            { id: 'dir1', name: 'dir 1' },
            { id: 'file1A', name: 'file 1 A' },
        ])
    })

    test('_getPathArrTill - return proper path segments till given folder', () => {
        const pathSeg = _getPathArrTill(_files, 'dir2XG')
        expect(pathSeg).toStrictEqual([
            { id: "/", name: "/" },
            { id: 'dir2', name: 'dir 2' },
            { id: 'dir2X', name: 'dir 2X' },
            { id: 'dir2XG', name: 'dir 2X G' },
        ])
    })

})