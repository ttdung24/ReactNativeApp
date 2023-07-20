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

        addTodo: (state, action: PayloadAction<ITodo>) => {
            state.push(action.payload);
        },

        updateTodo: (state, action: PayloadAction<ITodo>) => {

        },

        deleteTodo: (state, action: PayloadAction<number>) => {
            state.splice(action.payload, 1);
        }
        
    }
})

export const { getTodoList, addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
