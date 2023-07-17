import React from "react";
import axios from 'axios';
import { StatusBar } from "expo-status-bar";
import { API_LINK } from "../../default-value";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Input, Layout, Text } from "@ui-kitten/components"
import { useState } from "react";
import { StyleSheet } from "react-native";
import { getAuth, createUserWithEmailAndPassword, } from "firebase/auth";
import { FirebaseApp } from "../firebase/config";


const LoginScreen = ({ navigation }:any) => {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const auth = getAuth(FirebaseApp);

    const insets = useSafeAreaInsets();

    const navigateLogin = (mail: string) => {
        navigation.navigate('Login', {
            mail: mail,
        });
    }

    const handleRegister = async (): Promise<void> => {
        try {
            const response = await createUserWithEmailAndPassword(auth, mail, password);
            if (auth.currentUser != null) {
                const id = auth.currentUser.uid;
                const responseUser = await axios.post(`${API_LINK}/users`, {
                    id,
                    name,
                    mail,
                });
                if (responseUser.status == 200) {
                    console.log(`${JSON.stringify(responseUser.data)}`)
                }
            }
            navigateLogin(mail);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Layout style={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            
          }}>
            <StatusBar style='light'/>
            <Layout
                style={[styles.main, styles.mt12]}  
            >
                <Text
                    style={styles.siText}
                    category="h2"
                >
                    Sign Up
                </Text>
                <Input
                    style={styles.mt12}
                    placeholder="Nhập tên người dùng"
                    value={name}
                    onChangeText={setName}
                />
                <Input
                    style={styles.mt12}
                    placeholder="Nhập email"
                    value={mail}
                    onChangeText={setMail}
                />
                <Input
                    style={styles.mt12}
                    placeholder="Nhập password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Input
                    style={styles.mt12}
                    placeholder="Nhập lại password"
                    value={confirmPass}
                    onChangeText={setConfirmPass}
                    secureTextEntry
                />
                <Button
                    style={styles.mt12}
                    onPress={handleRegister}
                > 
                    REGISTER 
                </Button>
                <Layout style={styles.mt12}>
                    <Text>
                        Have an account? {' '}  
                        <Text onPress={() => navigateLogin(mail)}>
                            Login
                        </Text>
                    </Text>
                    
                </Layout>
            </Layout>
        </Layout>
    );   
}

const styles = StyleSheet.create({
    main: {
        padding: 20,
        flex: 1
    },
    mt12: {
        marginTop: 12,
    },
    siText: {
        
        textAlign: "center"
    },
    input: {
        marginTop: 12,
    },
    btn: {
        marginTop: 12,
    }
})

export default LoginScreen;