export const APP_DISPLAY_TYPE = {
    WINDOW: 'app_display_type_window',
    CONSOLE: 'app_display_type_console',
    NO_DISPLAY: 'app_display_type_no_display'
}

export const APPS_DETAILS = {
    "appsviewer": {
        appId: "appsviewer",
        name: "Apps",
        iconClass: "fa-solid fa-cubes-stacked",
        docked: true,
        displayType: APP_DISPLAY_TYPE.WINDOW,
        allowedInstances: 1,
        keywords: ['apps', 'all apps']
    },
    "folders": {
        appId: "folders",
        name: "Folders",
        iconClass: "fa-regular fa-folder-open",
        docked: true,
        displayType: APP_DISPLAY_TYPE.WINDOW,
        keywords: ['finder', 'files', 'folders', 'explorer']
    },
    "settings": {
        appId: "settings",
        name: "Settings",
        iconClass: "fa-solid fa-gear",
        docked: true,
        displayType: APP_DISPLAY_TYPE.WINDOW,
        allowedInstances: 1
    },
    "welcomeapp": {
        appId: "welcomeapp",
        name: "Welcome",
        iconClass: "fa-solid fa-face-smile",
        displayType: APP_DISPLAY_TYPE.WINDOW
    },
    "bcalc": {
        appId: "bcalc",
        name: "B-Calc",
        iconClass: "fa-solid fa-calculator",
        displayType: APP_DISPLAY_TYPE.WINDOW,
        keywords: ['bcalc', 'calc', 'calculator', 'math']
    },
    "terminal": {
        appId: "terminal",
        name: "Terminal",
        iconClass: "fa-solid fa-terminal",
        docked: true,
        displayType: APP_DISPLAY_TYPE.WINDOW,
        keywords: ['terminal', 'cmd', 'command line', 'command-line', 'dos', 'emulator', 'shell']
    },
    "timer": {
        appId: "timer",
        name: "Timer",
        iconClass: "fa-solid fa-stopwatch-20",
        displayType: APP_DISPLAY_TYPE.WINDOW,
        // docked: true
    },
    "bin": {
        appId: "bin",
        name: "Bin",
        iconClass: "fa-solid fa-trash",
        docked: true,
        displayType: APP_DISPLAY_TYPE.WINDOW
    },
    "bnotes": {
        appId: "bnotes",
        name: "B-Notes",
        iconClass: "fa-solid fa-file-lines",
        displayType: APP_DISPLAY_TYPE.WINDOW
    },
    "bchat": {
        appId: "bchat",
        name: "B-Chat",
        iconClass: "fa-solid fa-comments",
        displayType: APP_DISPLAY_TYPE.WINDOW
    },
    "calendars": {
        appId: "calendars",
        name: "Calendar",
        iconClass: "fa-regular fa-calendar-days",
        displayType: APP_DISPLAY_TYPE.WINDOW
    }
}