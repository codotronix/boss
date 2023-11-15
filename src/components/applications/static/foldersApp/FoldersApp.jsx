import withWinFrame from "../../withWinFrame"
import { useState, useEffect } from "react"
import { useFileSystem } from "../../../../features/fileSystem/useFileSystem"
import styles from './FoldersApp.module.css'
import { FILE_TYPE } from "../../../../const/FILE_CONST"
// import { useCMDHandler } from "../../../common/winframe/useCMDHandler"
import File from "./file/File"
// import clsx from 'clsx'

const COMMANDS = {
    NEW_FILE: 'NEW_FILE',
    NEW_FOLDER: 'NEW_FOLDER'
}

const FoldersApp = props => {
    const { configMenu, menuCommand, useCMDHandler=()=>{} } = props
    const fs = useFileSystem()
    const [currentFolderId, setCurrentFolderId] = useState("/") // open in root
    const [currentFiles, setCurrentFiles] = useState(fs.getChildren(currentFolderId))
    
    // To Handle The Menu Commands
    // The useCMDHandler hook takes 2 args
    // 1. cmd to watch
    // 2. handler function
    useCMDHandler(menuCommand, cmd => {

        if(cmd === COMMANDS.NEW_FILE) {
            // console.log('Create new file')
            const cnt = Math.floor(Math.random()*999) 
            fs.createFile(`File_${cnt}`, currentFolderId)
        }
        else if(cmd === COMMANDS.NEW_FOLDER) {
            // console.log('Create new folder')
            const cnt = Math.floor(Math.random()*999) 
            fs.createDir(`Folder_${cnt}`, currentFolderId)
        }

        refresh()
    })


    // const cmdRef = useRef('')

    const open = (fId, fileType) => {
        // If it's a folder, get inside
        if(fileType === FILE_TYPE.FOLDER) {
            setCurrentFolderId(fId)
            setCurrentFiles(fs.getChildren(fId))
        }
        // Else a file
        // TODO: Open it with appropriate app
    }

    const refresh = () => {
        // Set to blank
        // and then set to actual
        // Otherwise, renaming might not reflect always
        // when rename is not done due to a name conflict 
        // and thus the object remains same in the store.
        // This is a way to force update
        setCurrentFiles([])
        setTimeout(() => {
            setCurrentFiles(fs.getChildren(currentFolderId))
        }, 0)
    }
    
    const goToParentFolder = () => {
        const parentId = fs.getParentId(currentFolderId)
        setCurrentFolderId(parentId)
        setCurrentFiles(fs.getChildren(parentId))
    }

    // Configure the menu
    useEffect(() => {
        configMenu({
            menu: {
                File: { 
                    2: { name: 'New File', command: COMMANDS.NEW_FILE },
                    3: { name: 'New Folder', command: COMMANDS.NEW_FOLDER },
                }
            }
        })
    }, 
    [configMenu])

    return (
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
    )
}

export default withWinFrame(FoldersApp)