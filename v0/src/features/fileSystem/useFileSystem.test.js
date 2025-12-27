import { _getPathTill, _getPathArrTill, _getChildren, _getChildrenNames, 
    _getFileInfo, _normalizePath } from "./useFileSystem"
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
        id: '/',
        name: "/",
        fileType: FILE_TYPE.FOLDER, 
        parentId: null,
        children: ['file1', 'file2', 'dir1', 'dir2']
    },
    "file1": { 
        id: 'file1',
        name: "file 1", 
        fileType: FILE_TYPE.FILE, 
        parentId: "/"
    },
    "file2": { 
        id: 'file2',
        name: "file 2", 
        fileType: FILE_TYPE.FILE, 
        parentId: "/"
    },
    "dir1": { 
        id: 'dir1',
        name: "dir 1", 
        fileType: FILE_TYPE.FOLDER, 
        parentId: "/",
        children: ['file1A', 'dir1A']
    },
    "file1A": { 
        id: 'file1A',
        name: "file 1 A", 
        fileType: FILE_TYPE.FILE, 
        parentId: "dir1"
    },
    "dir1A": { 
        id: 'dir1A',
        name: "dir-1-A", 
        fileType: FILE_TYPE.FOLDER, 
        parentId: "dir1",
        children: []
    },
    "dir2": { 
        id: 'dir2',
        name: "dir 2",
        fileType: FILE_TYPE.FOLDER, 
        parentId: "/",
        children: ['dir2X']
    },
    "dir2X": { 
        id: 'dir2X',
        name: "dir 2X",
        fileType: FILE_TYPE.FOLDER, 
        parentId: "dir2",
        children: ['dir2XG']
    },
    "dir2XG": { 
        id: 'dir2XG',
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

    test('_getChildren should return all the children nodes', () => {
        // root has 4 children
        let children = _getChildren(_files, "/")
        expect(children.length).toBe(4)

        // dir1 has 2 children
        children = _getChildren(_files, "dir1")
        expect(children.length).toBe(2)

        // dir2X has one children, inspect its name
        children = _getChildren(_files, "dir2X")
        expect(children.length).toBe(1)
        expect(children[0].name).toBe("dir 2X G")
    })

    test('_getChildrenNames should return all the children names', () => {
        // root has 4 children
        let childrenNames = _getChildrenNames(_files, "/")
        expect(childrenNames.sort()).toEqual(['file 1', 'file 2', 'dir 1', 'dir 2'].sort())

        // dir1 has 2 children
        childrenNames = _getChildrenNames(_files, "dir1")
        expect(childrenNames.sort()).toEqual(['dir-1-A', 'file 1 A'].sort())

        // dir2X has one children, inspect its name
        childrenNames = _getChildrenNames(_files, "dir2X")
        expect(childrenNames.sort()).toEqual(['dir 2X G'].sort())
    })

    test('_getFileInfo should return info of file in given absolute path', () => {
        let file = _getFileInfo(_files, "/")
        expect(file.name).toBe('/')

        file = _getFileInfo(_files, "/dir 1")
        expect(file.name).toBe("dir 1")

        file = _getFileInfo(_files, "/dir 1/file 1 A")
        expect(file.name).toBe("file 1 A")
        expect(file.fileType).toBe(FILE_TYPE.FILE)

        file = _getFileInfo(_files, "/dir 2/dir 2X/dir 2X G")
        expect(file.name).toBe("dir 2X G")
        expect(file.fileType).toBe(FILE_TYPE.FOLDER)

        file = _getFileInfo(_files, "/non existent path 1/path 2/file name")
        expect(file).toBeNull()
    })

    test('_normalizePath should reduce multiple / to one', () => {
        let npath = _normalizePath('///a/b//c')
        expect(npath).toBe('/a/b/c')

        npath = _normalizePath('/')
        expect(npath).toBe('/')

        npath = _normalizePath('///aaaa//')
        expect(npath).toBe('/aaaa/')

        npath = _normalizePath('//')
        expect(npath).toBe('/')

        npath = _normalizePath('//a')
        expect(npath).toBe('/a')

        npath = _normalizePath('abc')
        expect(npath).toBe('abc')

        npath = _normalizePath('aaa')
        expect(npath).toBe('aaa')

        npath = _normalizePath('aaa//bb')
        expect(npath).toBe('aaa/bb')

        npath = _normalizePath('/dir 1')
        expect(npath).toBe('/dir 1')
    })
})