import { loginStart, loginSuccess, loginFailure } from "./slice/accountSlice";
import axios from "axios";
import { API_LINK } from "../../default-value";
import { FirebaseApp } from "../firebase/config";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import * as SecureStore from 'expo-secure-store';
import { getTodoList, addTodo, deleteTodo } from "./slice/todoSlice";
import { ITodo } from "../types/todo";

export const login = async (dispatch: any, mail: string, password: string) => {
    dispatch(loginStart())
    const auth = getAuth(FirebaseApp);
    try {
        const res = await signInWithEmailAndPassword(auth, mail, password);
        if (auth.currentUser != null) {
            const url = `${API_LINK}/auth/login`
            const res2 = await axios.post(url, {
                mail,
            })
            await SecureStore.setItemAsync('my-jwt', JSON.stringify(res2.data.token))
            dispatch(loginSuccess(res2.data.user))
            return res2.data.token
        }   
    } catch (error) {
        dispatch(loginFailure());
        console.log(error);
    }
}

export const fetchUser = async (dispatch: any, refreshToken: string) => {
    dispatch(loginStart())
    try {
        const url = `${API_LINK}/users`;
        const res = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`,
            },
        })
        dispatch(loginSuccess(res.data.user[0]))
    } catch (error) {
        dispatch(loginFailure());
        console.log(error);
    }
}

export const fetchTodoList = async (dispatch: any) => {
    try {
        const url = `${API_LINK}/todo`;
        const res = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        dispatch(getTodoList(res.data.todos))
    } catch (error) {
        console.log(error);
    }
}

export const addTodoList = async (dispatch: any, title: string, des: string, time: string, day: string) => {
    try {
        const url = `${API_LINK}/todo`;
        const res = await axios.post(url, 
            {
                title: title,
                description: des,
                time: time,
                day: day
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        dispatch(addTodo(res.data.todo))
    } catch (error) {
        console.log(error);
    }
}

export const deleteTodoList = async (dispatch: any, item: ITodo, index: number) => {
    try {
        const url = `${API_LINK}/todo`;
        const res = await axios.delete(url, 
            {
                data: {
                    _id: item._id,  
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        dispatch(deleteTodo(index))
    } catch (error) {
        console.log(error);
    }
}