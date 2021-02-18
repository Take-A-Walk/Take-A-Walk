import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
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
    const [loggedIn, setLoggedIn] = useState(false);

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

        // set persistence to none
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

        // eventhandler for signing in or signing out
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            // based on the 'user' argument
            if (user) {
                console.log('user logged in');
                setLoggedIn(true);
            } else {
                console.log('user not logged in');
                setLoggedIn(false);
            }
        });
    }, [])

    return (
    <SafeAreaProvider>
        <NavigationContainer>
            <Stack.Navigator>
                {loggedIn == false ? (
                    <Stack.Screen
                    name="Login"
                    component={LoginForm}
                    options={{ title: 'Login' }}
                    />
                ) : (
                    <>
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
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}
