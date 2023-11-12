import { useFileSystem } from "../../../features/fileSystem/useFileSystem"
import { FILE_TYPE } from "../../../const/FILE_CONST"

export function useFsCommands () {
    const fs = useFileSystem()

    return {
        ls, pwd, touch, mkdir,
        md: mkdir, cd,
    }


    // list all files in current working directory
    function ls (ctx, args) {
        const files = fs.getChildrenNames(ctx.currentFolderId)
        return [files, 0]
    }

    // Return the present working directory
    function pwd (ctx, args) {
        // console.log(ctx)
        const path = fs.getPathTill(ctx.currentFolderId)
        return [path, 0]
    }

    // create new files touch file1 file2
    function touch (ctx, args) {
        let msgs = ''
        for(let f of args) {
            let msg = fs.createFile(f, ctx.currentFolderId)
            if(msg) {
                msgs += msg + '\n'
            }
        }
        return [msgs, 0]
    }

    // create new folder mkdir dir1 dir2
    function mkdir (ctx, args) {
        let msgs = ''
        for(let f of args) {
            let msg = fs.createDir(f, ctx.currentFolderId)
            if(msg) {
                msgs += msg + '\n'
            }
        }
        return [msgs, 0]
    }

    function cd (ctx, args) {
        let path = args[0]
        if(!path) return ['', 0]

        // if the path needs to start from current location
        if(path[0] !== '.' && path[0] !== '/') {
            path = pwd(ctx)[0] + path
        }

        let fileInfo = fs.getFileInfo(path)

        console.log(fileInfo)
        if(fileInfo && fileInfo.fileType === FILE_TYPE.FOLDER) {
            ctx.currentFolderId = fileInfo.Id 
        }
        else {
            return [
                `"${path}" is not a folder to move into`
            ]
        }

        console.log(ctx)
        return [
            '', 0
        ]
    }
}