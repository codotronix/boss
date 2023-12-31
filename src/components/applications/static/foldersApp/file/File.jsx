import { useState, useEffect } from 'react'
import styles from './File.module.css'
import { FILE_TYPE } from '../../../../../const/FILE_CONST'
import { isFileNameValid } from '../../../../../services/utils'
import { useFileSystem } from '../../../../../features/fileSystem/useFileSystem'
// import { trimNDot } from '../../../../../services/utils'

const File = props => {
    const { file, open } = props
    const [name, setName] = useState('')
    const fs = useFileSystem()

    useEffect(() => {
        setName(file.name)
    }, 
    [file.name])

    const onNameChange = e => {
        const newName = e.target.value
        if(!isFileNameValid(newName)) return
        setName(newName)
    }

    const saveNewFileName = () => {
        // if the file name has changed
        if(name !== file.name) {
            fs.rename(file.id, name)
        }
    }

    return (
        <div 
            className={styles.file} 
            onDoubleClick={() => open(file.id, file.fileType)}
        >
            <span className={styles.ffIco}>
                { file.fileType === FILE_TYPE.FILE && <i className="fa-solid fa-file-lines"></i> }
                { file.fileType === FILE_TYPE.FOLDER && <i className="fa-regular fa-folder-open"></i> }
            </span>
            <input 
                className={styles.fname} 
                type="text" 
                value={name} 
                onChange={onNameChange} 
                onBlur={saveNewFileName}
            />
        </div>
    )
}

export default File