/**
 * This is the processor for terminal input,
 * Given the current line entered by the user,
 * and the ctx of the previous interaction,
 * it will return the result
 */
export function process(line, ctx) {
    let args = line.trim().split(/\s+/)
    console.log(args)
    // default init
    let msg = `Sorry could not find the command "<b>${args[0]}</b>"`
    let code = -1


    return { msg, code, ctx }
}