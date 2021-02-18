import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import GLOBAL from './global.js'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginForm from './components/LoginForm';
import Homepage from './components/Homepage';
import ProfileScreen from './components/ProfileScreen';
import MapScreen from './components/MapScreen';

import firebase from './Firebase';
require

const Stack = createStackNavigator();

export default function App() {
    
    useEffect(() => {
        // create reference - dbRefObj points at the location object
        const dbRefObj = firebase.database().ref().child('users');

        // sync object changes
        dbRefObj.on('value', snap => console.log(snap.val()));

        // dbRefObj.get()
        //     .then((snap) => {
        //         console.log(snap.val());
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })

        // console.log(dbRefObj);
    }, [])

    return (
    <SafeAreaProvider>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name="Login"
                component={LoginForm}
                options={{ title: 'Login' }}
                />
                <Stack.Screen
                name="Home"
                component={Homepage}
                options={{ title: 'Dashboard' }}
                />
                <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Profile' }}
                />
                <Stack.Screen
                name="Map"
                component={MapScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}
