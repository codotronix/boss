export const MENU_COMMANDS = {
    NEW_WINDOW: "new_window",
    CLOSE_WINDOW: "close_window"
}

export const DEFAULT_MENU = {
    File: [ 
        { name: "New Window", command: MENU_COMMANDS.NEW_WINDOW },
        { name: "Close Window", command: MENU_COMMANDS.CLOSE_WINDOW } 
    ],
    Menu2: [ 
        { command: "sub1", name: "Sub Menu 1" },
        { command: "sub2", name: "Sub Menu 2" },
        { command: "sub3", name: "Sub Menu 3" },
        { command: "sub4", name: "Sub Menu 4" }
    ]
}