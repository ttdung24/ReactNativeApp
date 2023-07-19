import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomePageScreen from '../screens/HomePageScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { fetchTodoList, fetchUser } from '../store/apiCall';


const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => {
  const value = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    if (value.authState?.authenticated) {
      fetchUser(dispatch, value.authState?.refreshToken!)
      fetchTodoList(dispatch)
    }
  }, [])

  return (
    <Navigator screenOptions={{headerShown: false}}>
      {value.authState?.authenticated ? (
        <>
          <Screen name='Homepage' component={HomePageScreen}/>
        </>
      ) : (
        <>
          <Screen name='Login' component={LoginScreen}/>
          <Screen name='Register' component={RegisterScreen}/>
        </>
      )}
    </Navigator>
)}

export const AppNavigator = () => (
  <AuthProvider>
    <NavigationContainer>
      <HomeNavigator/>
    </NavigationContainer>
  </AuthProvider>
);