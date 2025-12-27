import { useSelector, useDispatch } from "react-redux"
import { create, rename } from "./filesSlice"
import { FILE_TYPE } from "../../const/FILE_CONST"
import { useCallback } from "react"
import { isFileNameValid } from "../../services/utils"

export const useFileSystem = () => {
    const _files = useSelector(state => state.files)
    const dispatch = useDispatch()
    
    const createFile = useCallback((name, parentId, owner) => _create(_files, dispatch, name, parentId, FILE_TYPE.FILE, owner), [dispatch, _files])
    const createDir = (name, parentId, owner) => _create(_files, dispatch, name, parentId, FILE_TYPE.FOLDER, owner)
    const rename = (fileId, newName) => _rename(_files, dispatch, newName, fileId)
    const createFolder = createDir
    const getParentId = fileID => _getParentId(_files, fileID)
    const getChildren = useCallback(parentId => _getChildren(_files, parentId), [_files])
    const getChildrenNames = parentId => _getChildrenNames(_files, parentId)
    /**
     * Get path names till the given file id
     * @param {*} fileId 
     * @returns 
     */
    const getPathTill = fileId => _getPathTill(_files, fileId)
    const getFileInfo = absPath => _getFileInfo(_files, absPath)

    return {
        allFiles: _files, createFile, createDir, createFolder, getParentId, getChildren, getChildrenNames, 
        getPathTill, getFileInfo, rename
    }
}

function _create (_files, dispatch, name, parentId, fileType, owner) {
    // File name invalid?
    if(!name.trim() || !isFileNameValid(name)) {
        return `Invalid name ${name}`
    }

    // Invalid parentId
    // Or parentId is not a folder
    if(!(parentId in _files) || _files[parentId].fileType !== FILE_TYPE.FOLDER) {
        return `Can not create file/folder in the given location`
    }

    // Check for duplicate file names
    if(_files[parentId].children.map(fid => _files[fid].name).includes(name)) {
        return `File/folder name "${name}" already exists`
    }

    dispatch(create({ name, parentId, fileType, owner }))
    return ''
}

function _rename(_files, dispatch, newName, fileId) {
    // File name invalid?
    if(!newName.trim() || !isFileNameValid(newName)) {
        return `Invalid name ${newName}`
    }
    // Invalid fileId
    if(!(fileId in _files)) {
        return `File ID (${fileId}) not valid`
    }

    // Check for duplicate file names
    // Amongst the Siblings
    const parentId = _files[fileId].parentId
    if(_files[parentId].children.map(fid => _files[fid].name).includes(newName)) {
        return `File/folder name "${newName}" already exists`
    }

    dispatch(rename({ fileId, newName }))
    return ''
}

export function _getParentId(_files, fileId) {
    if(fileId === '/') return "/"
    else return _files[fileId].parentId
}

/**
 * Returns string path NAMES starting from root to the given fileId
 * Note: it returns the file/folder names, not the ids
 * Please see the unit tests to understand more
 * @param {*} _files | File Tree JSON
 * @param {String} fileId | A FileID or FolderID
 * @returns 
 */
export function _getPathTill(_files, fileId) {
    let pathSegments = []

    // go up the parent ladder
    while(fileId in _files) {
        // we need the names, not the IDs
        pathSegments.push(_files[fileId].name)
        fileId = _files[fileId].parentId
    }

    return pathSegments.reverse().join("/").replace('//', '/')
}

/**
 * Returns an array of fileId and fileName till the root
 * [ { id: "/", name: "/" } , { id1, name1 }, { id2, name2 }, ..., { givenId, nameN } ]
 * See unit test to understand test cases
 * @param {JSON} _files | File Tree JSON
 * @param {String} fileId | A FileID or FolderID
 * @returns 
 */
export function _getPathArrTill(_files, fileId) {
    let pathSegments = []

    // go up the parent ladder
    while(fileId in _files) {
        // we need the names, not the IDs
        let pathObj = { id: fileId, name: _files[fileId].name }
        pathSegments.push(pathObj)
        fileId = _files[fileId].parentId
    }

    return pathSegments.reverse()
}

/**
 * Return array of children nodes for a given parentId
 * @param {JSON} _files | File Tree JSON
 * @param {String} fileId | A FileID or FolderID
 * @returns Array<FileNodes> 
 */
export function _getChildren(_files, parentId) {
    let children = []
    if(parentId === '') {
        children = Object.values(_files).filter(f => f.parentId === parentId)
    }
    else if (parentId in _files) {
        let childrenIds = _files[parentId].children || []
        children = childrenIds.map(cId => _files[cId])
    }
    return children
}

/**
 * Return strings of names of all the children
 * @param {JSON} _files | File Tree JSON
 * @param {String} fileId | A FileID or FolderID
 * @returns Array<String> 
 * @returns 
 */
export function _getChildrenNames(_files, parentId) {
    return _getChildren(_files, parentId).map(f => f.name)
}

/**
 * Returns the file node at the given absolute path or return null
 * @param {JSON} _files | File Tree JSON
 * @param {String} absPath | Absolute path starting with / 
 * @returns FileNode
 */
export function _getFileInfo (_files, absPath) {
    absPath = _normalizePath(absPath)

    // if root itself
    if(absPath === '/') return _files["/"]

    // get the file/folder names array
    let pathNames = absPath.split('/').filter(f => f.trim().length>0)

    // initial scope of search is the root level files
    let filesInLevel = _getChildren(_files, '/')

    // the final resulting file
    let lastFile = null

    // loop thru the path names one by one
    for(let fname of pathNames) {
        let isFound = false
        for(let file of filesInLevel) {
            // if found ?
            if(file.name === fname) {
                isFound = true 
                lastFile = file
                filesInLevel = _getChildren(_files, file.id)
                break
            }
        }

        // broken breadcrumb
        if(!isFound) {
            return null 
        }
    }
    return lastFile
} 

/**
 * Normalize a given stringpath
 * 1. Reduce multiple slashes ///// to single /
 * @param {String} path 
 * @returns 
 */
export function _normalizePath (path) {
    // multiple //// should be reduced to single /
    let s = path[0]
    for(let i=1; i<path.length; ++i) {
        if(path[i] === path[i-1] && path[i] === '/') continue;
        else s += path[i]
    }
    return s
}
