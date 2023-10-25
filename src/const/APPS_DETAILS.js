export const APP_DISPLAY_TYPE = {
    WINDOW: 'app_display_type_window',
    CONSOLE: 'app_display_type_console',
    NO_DISPLAY: 'app_display_type_no_display'
}

export const APPS_DETAILS = {
    "apps_viewer": {
        appId: "apps_viewer",
        name: "All Apps",
        iconClass: "fa-solid fa-cubes-stacked",
        docked: true,
        displayType: APP_DISPLAY_TYPE.WINDOW,
        allowedInstances: 1
    },
    "folders": {
        appId: "folders",
        name: "Folders",
        iconClass: "fa-regular fa-folder-open",
        docked: true,
        displayType: APP_DISPLAY_TYPE.WINDOW
    },
    "settings": {
        appId: "settings",
        name: "Settings",
        iconClass: "fa-solid fa-gear",
        docked: true
    },
    "welcomeApp": {
        appId: "welcomeApp",
        name: "Welcome App",
        iconClass: "fa-solid fa-face-smile",
        displayType: APP_DISPLAY_TYPE.WINDOW
    },
    "b_calc": {
        appId: "b_calc",
        name: "B-Calc",
        iconClass: "fa-solid fa-calculator",
        displayType: APP_DISPLAY_TYPE.WINDOW
    },
    "timer_app": {
        appId: "timer_app",
        name: "Timer",
        iconClass: "fa-solid fa-stopwatch-20",
        displayType: APP_DISPLAY_TYPE.WINDOW,
        docked: true
    },
    "bin": {
        appId: "bin",
        name: "Bin",
        iconClass: "fa-solid fa-trash",
        docked: true,
        displayType: APP_DISPLAY_TYPE.WINDOW
    },
    "b_notes": {
        appId: "b_notes",
        name: "B-Notes",
        iconClass: "fa-solid fa-file-lines",
        displayType: APP_DISPLAY_TYPE.WINDOW
    },
    "b_chat": {
        appId: "b_chat",
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