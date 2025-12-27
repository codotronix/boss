import withWinFrame from "../../withWinFrame"
import { useState, useEffect, useCallback } from "react"
import { useFileSystem } from "../../../../features/fileSystem/useFileSystem"
import styles from './FoldersApp.module.css'
import { FILE_TYPE } from "../../../../const/FILE_CONST"
import File from "./file/File"


const FoldersApp = props => {
    const { renderMenu, onClose, onNew  } = props
    const fs = useFileSystem()
    const { allFiles, getChildren } = fs
    const [currentFolderId, setCurrentFolderId] = useState("/") // open in root
    const [currentFiles, setCurrentFiles] = useState(fs.getChildren(currentFolderId))
    // const _files = useSelector(state => state.files)

    useEffect(() => {
        setCurrentFiles(getChildren(currentFolderId))
    }, 
    [allFiles, currentFolderId, getChildren])

    const refresh = useCallback(() => {
        const _currrentChildren = getChildren(currentFolderId)
        setCurrentFiles(_currrentChildren)
    }, [allFiles, currentFolderId, getChildren])

    const createNewFile = () => {
        const cnt = Math.floor(Math.random()*999) 
        fs.createFile(`File_${cnt}`, currentFolderId)
        refresh()
    }

    const createNewFolder = () => {
        const cnt = Math.floor(Math.random()*999) 
        fs.createDir(`Folder_${cnt}`, currentFolderId)
        refresh()
    }
    
    const createMenu = () => {
        return renderMenu({
            File: {
                "New Window": { handleClick: onNew },
                "New File": { handleClick: createNewFile },
                "New Folder": { handleClick: createNewFolder },
                "Quit": { handleClick: onClose },
            }
        })
    }

    const open = (fId, fileType) => {
        // If it's a folder, get inside
        if(fileType === FILE_TYPE.FOLDER) {
            setCurrentFolderId(fId)
            setCurrentFiles(fs.getChildren(fId))
        }
        // Else a file
        // TODO: Open it with appropriate app
    }
    
    const goToParentFolder = () => {
        const parentId = fs.getParentId(currentFolderId)
        setCurrentFolderId(parentId)
        setCurrentFiles(fs.getChildren(parentId))
    }

    return (
        <>
        { createMenu() }
        <div className={styles.root}>
            <div className={styles.locationBar}>
                <div className={styles.loc}>
                    { fs.getPathTill(currentFolderId) }
                </div>
                <div className={styles.btns}>
                    <i className="fa-solid fa-rotate-right" onClick={refresh}></i>
                    <i className="fa-solid fa-arrow-up" onClick={goToParentFolder}></i>
                </div>
                
            </div>
            
            <div>
                <div className={styles.inner}>
                    {
                        currentFiles && currentFiles.map(f => 
                            <File 
                                key={f.id} file={f} 
                                open={open} 
                                refresh={refresh} 
                                existingFileNames={currentFiles.map(f => f.name)}
                            />
                        )
                    }
                </div>
            </div>
            
        </div>
        </>
    )
}

export default withWinFrame(FoldersApp)