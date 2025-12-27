import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import systemReducer from "./slices/systemSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    system: systemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
