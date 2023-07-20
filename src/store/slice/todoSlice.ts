import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../types/todo";


export const todoSlice = createSlice({
    name: "todo",
    initialState: [] as ITodo[], 
    reducers: {
        
        getTodoList: (state, action: PayloadAction<ITodo[]>) => {
            state.splice(0, state.length, ...action.payload);
        },

        addTodo: (state, action: PayloadAction<ITodo>) => {
            state.push(action.payload);
        },

        updateTodo: (state, action: PayloadAction<ITodo>) => {
            state.forEach((item: ITodo, i) => {if (item._id == action.payload._id) state[i] = action.payload})
        },

        deleteTodo: (state, action: PayloadAction<number>) => {
            state.splice(action.payload, 1);
        }
        
    }
})

export const { getTodoList, addTodo, updateTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
