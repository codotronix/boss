/**
 * This is the processor for terminal input,
 * Given the current line entered by the user,
 * and the ctx of the previous interaction,
 * it will return the result
 */
import { useFsCommands } from "./commandScripts/useFsCommands"
import { splitter } from "../utils"

export function useProcessor(ctx) {
    const fsCommands = useFsCommands()
    
    return function process(line) {
        let args = splitter(line) // line.trim().split(/\s+/)
        let cmd = args[0]
        console.log(args)

        // Let's create a basket of Commands
        // TODO: CHECK for Naming Collision among Commands
        const allCommands = {
            ...fsCommands
        }

        // default init
        let msg = `Sorry could not find the command "<b>${cmd}</b>"`
        let code = -1
        
        if(cmd in allCommands) {
            [ msg, code ] = allCommands[cmd](ctx, args.slice(1))
        }

        return { msg, code, ctx }
    }
    
}