import React, {useState, useEffect} from 'react';
import { Card, Text } from 'react-native-elements';
import MapDisplay from './MapDisplay'
import * as Location from 'expo-location';

export default function MapScreen({navigation, route}) {
    // console.log(route.params.name)
    return(
        <MapDisplay location={route.params.location} errorMsg={route.params.errorMsg} placeResponse={route.params.placeResponse}/>
    );
}