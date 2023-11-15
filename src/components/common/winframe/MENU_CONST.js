export const MENU_COMMANDS = {
    NEW_WINDOW: "new_window",
    CLOSE_WINDOW: "close_window"
}

export const DEFAULT_MENU = {
    File: {
        1: { name: "New Window", command: MENU_COMMANDS.NEW_WINDOW },
        100: { name: "Close Window", command: MENU_COMMANDS.CLOSE_WINDOW } 
    }
}