import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export interface AuthProps {
    authState?: {
        accessToken: string | null,
        refreshToken: string | null,
        authenticated: boolean | null,
    },
    handleState?: (authenticated: boolean) => void
}

const AuthContext = createContext<AuthProps>({})

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        accessToken: string | null,
        refreshToken: string | null,
        authenticated: boolean | null,
    }>({
        accessToken: '',
        refreshToken: '',
        authenticated: false
    });

    useEffect(() => {
        const loadToken = async () => {
            try {
                const data = await SecureStore.getItemAsync('my-jwt');
                if (data) {
                    const token = JSON.parse(data || "{}");
                    setAuthState({
                        accessToken: token.accessToken,
                        refreshToken: token.refreshToken,
                        authenticated: true,
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }
        loadToken();
    }, [])

    const value = {
        authState,
        handleState: (authenticated: boolean) => setAuthState({
            ...authState,
            authenticated: authenticated
        }) 
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}