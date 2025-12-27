import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './features/counter/counterSlice'
import appsReducer from '../features/apps/appsSlice'
import procsReducer from '../features/procs/procsSlice'
import filesReducer from '../features/fileSystem/filesSlice'
import settingsReducer from '../features/settings/settingsSlice'

export const store = configureStore({
    reducer: {
        // counter: counterReducer,
        apps: appsReducer,
        procs: procsReducer,
        files: filesReducer,
        settings: settingsReducer,
    }
})