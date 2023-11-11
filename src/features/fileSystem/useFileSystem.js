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
    const getPathNamesTill = fileId => _getPathNamesTill(_files, fileId)
    const getFileInfo = absPath => _getFileInfo(_files, absPath)

    return {
        createFile, createDir, createFolder, getChildrenNames, getPathNamesTill, getFileInfo
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

function _getPathNamesTill(_files, fileId) {
    let pathSegments = []

    // go up the parent ladder
    while(fileId in _files) {
        // we need the names, not the IDs
        pathSegments.push(_files[fileId].name)
        fileId = _files[fileId].parentId
    }

    // // push the Root
    // pathSegments.push('')

    return pathSegments.reverse()
}

function _getChildren(_files, parentId) {
    let children = []
    if(parentId === '') {
        children = Object.values(_files).filter(f => f.parentId === parentId)
    }
    else if (parentId in _files) {
        children = _files[parentId].children || []
    }
    return children
}

function _getChildrenNames(_files, parentId) {
    return _getChildren(_files, parentId).map(f => f.name)
}

function _getFileInfo (_files, absPath) {
    // get the file/folder names array
    let pathNames = absPath.split('/').filter(f => f.trim().length>0)

    // initial scope of search is the top level files
    let filesInLevel = _getChildren(_files, '')

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
