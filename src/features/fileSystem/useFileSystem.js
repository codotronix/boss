import { useSelector, useDispatch } from "react-redux"
import { create } from "./filesSlice"
import { FILE_TYPE } from "../../const/FILE_CONST"
export const useFileSystem = () => {
    const _files = useSelector(state => state.files)
    const dispatch = useDispatch()
    
    const createFile = (name, parentId, owner) => _create(_files, dispatch, name, parentId, FILE_TYPE.FILE, owner)
    const createDir = (name, parentId, owner) => _create(_files, dispatch, name, parentId, FILE_TYPE.FOLDER, owner)
    const createFolder = createDir
    const getChildrenNames = parentId => _getChildrenNames(_files, parentId)
    const getPathTill = fileId => _getPathTill(_files, fileId)
    const getFileInfo = absPath => _getFileInfo(_files, absPath)

    return {
        createFile, createDir, createFolder, getChildrenNames, getPathTill, getFileInfo
    }
}

function _create (_files, dispatch, name, parentId, fileType, owner) {
    // check if same fileName already present for the parent
    if(Object.values(_files).filter(f => f.parentId === parentId).map(f => f.name).includes(name)) {
        return `File name "${name}" already exists`
    }

    dispatch(create({ name, parentId, fileType, owner }))
    return ''
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

// return all children nodes for a given parent
function _getChildren(_files, parentId) {
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

function _getChildrenNames(_files, parentId) {
    return _getChildren(_files, parentId).map(f => f.name)
}

function _getFileInfo (_files, absPath) {
    // get the file/folder names array
    let pathNames = absPath.split('/').filter(f => f.trim().length>0)

    // initial scope of search is the root level files
    let filesInLevel = _getChildren(_files, '/')

    let lastFile = null

    for(let fname of pathNames) {
        let isFound = false
        for(let file of filesInLevel) {
            // if found ?
            if(file.name === fname) {
                isFound = true 
                lastFile = file
                filesInLevel = file.children
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

function _normalizePath (path) {

}
