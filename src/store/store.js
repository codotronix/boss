import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './features/counter/counterSlice'
import appsReducer from '../features/apps/appsSlice'
import procsReducer from '../features/procs/procsSlice'

export const store = configureStore({
    reducer: {
        // counter: counterReducer,
        apps: appsReducer,
        procs: procsReducer
    }
})