import { loginStart, loginSuccess, loginFailure } from "./slice/accountSlice";
import axios from "axios";
import { API_LINK } from "../../default-value";
import { FirebaseApp } from "../firebase/config";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import * as SecureStore from 'expo-secure-store';


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
        }
        
    } catch (error) {
        dispatch(loginFailure());
        console.log(error)
    }
}