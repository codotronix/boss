import { WelcomeApp, BCalc, AppsViewerApp, TimerApp, SettingsApp, TerminalApp
} from '../components/applications'

export const MAP_APP_ID_TO_COMPONENT = {
    "appsviewer": AppsViewerApp,
    'settings': SettingsApp,
    "terminal": TerminalApp,
    'welcomeapp': WelcomeApp,
    'bcalc': BCalc,
    'timer': TimerApp,
}