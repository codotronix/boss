/**
 * This is the processor for terminal input,
 * Given the current line entered by the user,
 * and the ctx of the previous interaction,
 * it will return the result
 */
import { useRun, useFsCommands } from "./commandScripts"
import { splitter } from "../utils"

export function useProcessor(ctx) {
    const fsCommands = useFsCommands()
    const run = useRun()
    
    const process = line => _process(line, ctx, {run, fsCommands})
    
    return { process }
}

function _process(line, ctx, ...commandsBank) {
    let args = splitter(line) // line.trim().split(/\s+/)
    let cmd = args[0]
    // console.log(args)

    // Let's create a basket of Commands
    // TODO: CHECK for Naming Collision among Commands
    let allCommands = {}

    for(let cmdBank of commandsBank) {
        allCommands = { ...allCommands, ...cmdBank }
    }

    // default init
    let msg = `Sorry could not find the command "<b>${cmd}</b>"`
    let code = -1
    
    if(cmd in allCommands) {
        [ msg, code ] = allCommands[cmd](ctx, args.slice(1))
    }

    return { msg, code, ctx }
}