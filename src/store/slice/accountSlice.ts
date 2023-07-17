import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { IAccount } from "../../types/account";


export interface AccountState {
    isLogin: boolean;
    user: IAccount | null;
    error: boolean;
}

const initialState: AccountState = {
    isLogin: false,
    user: null,
    error: false,
}

export const accountSlice = createSlice({
    name: "account",
    initialState, 
    reducers: {
        loginStart: (state) => {
            state.isLogin = true;
        },
        loginSuccess: (state, action: PayloadAction<IAccount>) => {
            state.user = action.payload;
            state.isLogin = true;
            state.error = false;
        },
        loginFailure: (state) => {
            state.isLogin = false;
            state.error = true;
          },
        logout: (state) => {
            state.user = null;
            state.isLogin = false;
        },

    }
})

export const { loginStart, loginSuccess, loginFailure, logout } = accountSlice.actions;

export default accountSlice.reducer;
