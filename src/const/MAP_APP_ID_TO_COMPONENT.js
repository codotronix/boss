import { WelcomeApp, BCalc, AppsViewerApp, TimerApp, SettingsApp, TerminalApp, FoldersApp
} from '../components/applications'

export const MAP_APP_ID_TO_COMPONENT = {
    "appsviewer": AppsViewerApp,
    'settings': SettingsApp,
    "terminal": TerminalApp,
    "folders": FoldersApp,
    'welcomeapp': WelcomeApp,
    'bcalc': BCalc,
    'timer': TimerApp,
}