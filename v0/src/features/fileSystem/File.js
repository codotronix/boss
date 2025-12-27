import { v4 as uuidv4 } from 'uuid';
import { FILE_TYPE } from "../../const/FILE_CONST";

/**
 * File Objects, Folders are special types of files
 * 
 * NOTE: Not making a class because that is not seriealizable by redux
 */

export function File (name, parentId, fileType, owner) {
    return {
        id : uuidv4(),
        name, parentId, fileType, owner,
        date_creation : Date.now(),
        date_modification : Date.now(),
        children: fileType === FILE_TYPE.FOLDER ? [] : null
    }
}

