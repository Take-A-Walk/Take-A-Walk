import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableHighlightBase, View } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Card } from 'react-native-elements';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';

export default function MapDisplay({location, errorMsg, placeResponse}) {

  mapMarkers = () =>{
    if(placeResponse){
      return placeResponse.map( (place) => {
        return (
          <Marker
              key={place.name}
              title ={place.name}
              coordinate = {{
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng
              }}
          />
        );
      });
    }
  }

  showMap = () =>{
        // if at least one of 'lat' or 'long' doesn't exist (both must exist to render)
        if (!location) {
            return (
                <Text>Please add Location</Text>
            )
        } else {
            return(
                <MapView 
                    provider = {PROVIDER_GOOGLE}
                    style = {styles.map} 
                    region = {{
                        latitude:  location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.035
                    }}
                    showsUserLocation = {true}>
                    {mapMarkers()}
                </MapView>
            );
        }
  }

  return(
      <View>
        {showMap()}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome:{
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  map:{
    height: '90%'
  }
});