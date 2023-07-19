import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Input, Layout, Text, Spinner } from "@ui-kitten/components"
import { useState  } from "react";
import { StyleSheet, ImageProps, View } from "react-native";
import { login } from "../store/apiCall"
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useAuth } from "../context/AuthContext";

const LoadingIndicator = (props: ImageProps): React.ReactElement => (
    <View style={[props.style, styles.indicator]}>
      <Spinner status="control" size='medium' />
    </View>
  );

const LoginScreen = ({ route, navigation }:any) => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const dispatch = useDispatch();
    
    const value = useAuth()
    
    const insets = useSafeAreaInsets();

    const navigateRegister = () => {
        navigation.navigate('Register')
    }

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const res = await login(dispatch, mail, password);
            if (res)
                value.handleState?.(true, res);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
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
                    Sign in
                </Text>
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
                <Button
                    style={styles.mt12}
                    accessoryLeft={isLoading ? LoadingIndicator: null}
                    onPress={handleLogin}
                > 
                    LOGIN 
                </Button>
                <Layout style={styles.mt12}>
                    <Text>
                        Haven't an account? {' '} 
                        <Text onPress={navigateRegister}>
                            Register
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
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default LoginScreen;