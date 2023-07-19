import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./slice/accountSlice";
import todoSlice from "./slice/todoSlice";

export const store = configureStore({
    reducer: {
        account: accountSlice,
        todo: todoSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch