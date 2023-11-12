import withWinFrame from "../../withWinFrame"
import { useState } from "react"
import { useFileSystem } from "../../../../features/fileSystem/useFileSystem"
import styles from './FoldersApp.module.css'
import { FILE_TYPE } from "../../../../const/FILE_CONST"
// import clsx from 'clsx'

const FoldersApp = props => {
    const fs = useFileSystem()
    const [currentFolderId, setCurrentFolderId] = useState("/") // open in root
    const [currentFiles, setCurrentFiles] = useState(fs.getChildren(currentFolderId))
    
    const trimNDot = (s, n) => s.length > n ? (s.substring(0,n) + '...') : s

    const open = (fId, fileType) => {
        // If it's a folder, get inside
        if(fileType === FILE_TYPE.FOLDER) {
            setCurrentFolderId(fId)
            setCurrentFiles(fs.getChildren(fId))
        }
        // Else a file
        // TODO: Open it with appropriate app
    }

    const refresh = () => setCurrentFiles(fs.getChildren(currentFolderId))
    
    const goToParentFolder = () => {
        const parentId = fs.getParentId(currentFolderId)
        setCurrentFolderId(parentId)
        setCurrentFiles(fs.getChildren(parentId))
    }

    return (
        <div className={styles.root}>

            <div className={styles.locationBar}>
                <div className={styles.loc}>
                    { fs.getPathTill(currentFolderId) }
                </div>
                <div className={styles.btns}>
                    <i className="fa-solid fa-rotate-right" onClick={refresh}></i>
                    <i class="fa-solid fa-arrow-up" onClick={goToParentFolder}></i>
                </div>
                
            </div>
            
            <div>
                <div className={styles.inner}>
                    {
                        currentFiles && currentFiles.map(f => 
                        <div key={f.id} className={styles.fbox} onDoubleClick={() => open(f.id, f.fileType)}>
                            <span className={styles.ffIco}>
                                { f.fileType === FILE_TYPE.FILE && <i className="fa-solid fa-file-lines"></i> }
                                { f.fileType === FILE_TYPE.FOLDER && <i class="fa-regular fa-folder-open"></i> }
                            </span>
                            <div className={styles.fname}>
                                {trimNDot(f.name, 100)}
                            </div>
                        </div>)
                    }
                </div>
            </div>
            
        </div>
    )
}

export default withWinFrame(FoldersApp)