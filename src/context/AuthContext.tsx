import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from 'react';

export interface AuthProps {
    authState?: {
        accessToken: string | null,
        refreshToken: string | null,
        authenticated: boolean | null,
        accessExpiresAt: string | null,
        refreshExpiresAt: string | null,
    },
    handleState?: (authenticated: boolean, res: any) => void
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
        accessExpiresAt: string | null,
        refreshExpiresAt: string | null,
    }>({
        accessToken: '',
        refreshToken: '',
        authenticated: false,
        accessExpiresAt: '',
        refreshExpiresAt: ''
    });

    useEffect(() => {
        const loadToken = async () => {
            try {
                const data = await SecureStore.getItemAsync('my-jwt');
                if (data) {
                    const token = JSON.parse(data || "{}")
                    if (Date.now() < token.refreshExpiresAt) {
                        setAuthState({
                            accessToken: token.accessToken,
                            refreshToken: token.refreshToken,
                            authenticated: true,
                            accessExpiresAt: token.accessExpiresAt,
                            refreshExpiresAt: token.refreshExpiresAt
                        })
                    } 
                }
            } catch (error) {
                console.log(error);
            }
        }
        loadToken();
    }, [])

    const value = {
        authState,
        handleState: (authenticated: boolean, res: any) => {
            if (authenticated === false) {
                setAuthState({
                    accessToken: '',
                    refreshToken: '',
                    authenticated: false,
                    accessExpiresAt: '',
                    refreshExpiresAt: ''
                })
            } else {
                setAuthState({
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken,
                    authenticated: true,
                    accessExpiresAt: res.accessExpiresAt,
                    refreshExpiresAt: res.refreshExpiresAt
                })
            }
        }
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}