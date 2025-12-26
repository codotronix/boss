/**
 * BOSS Terminal command 'run'.
 * It will try to run the app, 
 * And pass the args to it.
 * @param {object} ctx 
 * @param {string[]} args 
 * @returns {string} message
 * @returns {number} code
 */

import useRuntime from "../../../features/procs/useRuntime";

export function useRun() {
    const { run } = useRuntime()

    return (ctx, args) => {
        try {
            run(args[0], { ctx }, ...args.slice(1))

            if(ctx.error) {
                return [ctx.error, 99]
            }
            return ['Attempting to run ' + args, 0]
        }
        catch (e) {
            return ['Failed to run the App']
        }
        
    }

}


