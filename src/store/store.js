import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './features/counter/counterSlice'
import appsReducer from '../features/apps/appsSlice'
import runtimeReducer from '../features/runtime/runtimeSlice'

export const store = configureStore({
    reducer: {
        // counter: counterReducer,
        apps: appsReducer,
        runtime: runtimeReducer
    }
})