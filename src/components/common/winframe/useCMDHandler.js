import { useRef, useEffect } from "react";

/**
 * Whenever user clicks on any menu-command in WinFrame,
 * The WinFrame passes `menuCommand` in props to the AppComponent
 * @param {String} menuCommand | The Menu Command to Watch for Change
 * @param {*} handlerFn | The callback function to call when new Command is received
 */
export function useCMDHandler(menuCommand, handlerFn) {
    const cmdRef = useRef('')   // to store already handled command

    // Watch the menuCommand
    // Whenever user clicks on the menu, it will get triggered
    useEffect(() => {
        // New value?
        if(menuCommand !== cmdRef.current) {
            // handle it by calling the callback fn
            handlerFn(menuCommand)
            // mark it as handled
            cmdRef.current = menuCommand
        }
    }, 
    [menuCommand, handlerFn])
}