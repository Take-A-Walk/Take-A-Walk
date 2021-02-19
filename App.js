import 'react-native-gesture-handler';
import React from 'react';
import GLOBAL from './global.js'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Homepage from './components/Homepage';
import ProfileScreen from './components/ProfileScreen';
import MapScreen from './components/MapScreen';

const Stack = createStackNavigator();

export default function App() {

    return (
    <SafeAreaProvider>
        <NavigationContainer>
            <Stack.Navigator>
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
                options = {{title: 'Map'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}
