import React, {useState, useEffect} from 'react';
import { Card, Text } from 'react-native-elements';
import MapDisplay from './MapDisplay'
import * as Location from 'expo-location';

export default function MapScreen() {
    return(
        <Card>
            <MapDisplay />
        </Card>
    );
}