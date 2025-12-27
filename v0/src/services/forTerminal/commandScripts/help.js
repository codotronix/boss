/**
 * the 'help' command for BOSS Terminal.
 * @param {object} ctx 
 * @param {string[]} args 
 * @returns {string} message
 * @returns {number} code
 */
import { APPS_DETAILS } from "../../../const/APPS_DETAILS"

export const help = (ctx, args) => {

    // "help apps" command
    // if the user wants to see the available apps
    if(args[0] === 'apps') {
        let appsNamesAndIds = '\nHere are the available apps:\n\n'
        Object.values(APPS_DETAILS).forEach(app => {
            appsNamesAndIds += `${app.name} (AppId: ${app.appId})\n`
        })

        appsNamesAndIds += '\nType `run &lt;appId&gt;` to run a app\n\n'

        return [appsNamesAndIds, 0]
    }
    return [helpText, 0]
}

const helpText = `
Available Commands:
help - Show this help text
help apps - Show available apps

run &lt;appId&gt; - Run an app

ls - List files in the current directory
pwd - Show current directory path

cd &lt;dir&gt; - Change directory
md &lt;dir&gt; - Make a new directory
mkdir - alias for md
touch &lt;file&gt; - Create a new file
cls - Clear the terminal screen
clear - alias for cls

`