import { WelcomeApp, BCalc, AppsViewerApp, TimerApp, SettingsApp, TerminalApp, FoldersApp, BinApp
} from '../components/applications'

export const MAP_APP_ID_TO_COMPONENT = {
    "appsviewer": AppsViewerApp,
    'settings': SettingsApp,
    "terminal": TerminalApp,
    "folders": FoldersApp,
    "bin": BinApp,
    'welcomeapp': WelcomeApp,
    'bcalc': BCalc,
    'timer': TimerApp,
}