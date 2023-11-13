import { useRef, useEffect } from "react";

export function useCMDHandler(cmd, handlerFn) {
    const cmdRef = useRef('')

    // Watch the menuCommand
    // Whenever user clicks on the menu, it will get triggered
    useEffect(() => {
        // already handled value?
        if(cmd !== cmdRef.current) {
            handlerFn(cmd)
            cmdRef.current = cmd
        }
    }, 
    [cmd, handlerFn])
}