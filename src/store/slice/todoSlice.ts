import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../types/todo";


export const todoSlice = createSlice({
    name: "todo",
    initialState: [] as ITodo[], 
    reducers: {
        
        getTodoList: (state, action: PayloadAction<ITodo[]>) => {
            state.push(...action.payload);
        },

        addTodos: (state, action: PayloadAction<ITodo>) => {
            state.push(action.payload);
        },
        
    }
})

export const { getTodoList, addTodos } = todoSlice.actions;

export default todoSlice.reducer;
