import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import systemReducer from "./slices/systemSlice";
import appsReducer from "./slices/appsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    system: systemReducer,
    apps: appsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
