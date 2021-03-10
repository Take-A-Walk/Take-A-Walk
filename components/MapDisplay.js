import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableHighlightBase, View } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Card } from 'react-native-elements';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';

export default function MapDisplay() {
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [placeResponse, setPlaceResponse] = useState(null);

  useEffect(() => {
      getMapData();   
  }, []);

  const getMapData = async () => {
      try {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
              //alert('Sorry, we need camera roll permissions to make this work!');
              setErrorMsg('Sorry we need your location for the app to work!');
              return;
          }
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          fetchPlacesAPI();
      } catch(err) {
          console.log(err);
      }
  }

  fetchPlacesAPI = () => {
    let radius = 2000;
    
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + long + '&radius=' + radius + '&type=park' + '&key=' + "AIzaSyB0Ckjw0mGcuaUHHTIyx6FW_zqygm-ZIBM"

    fetch(url)
      .then(res => res.json())
      .then(data => {
       setPlaceResponse(data.results);
      })
      .catch(console.error)
      
  }

  let text = "Waiting...";
  let lat = 0;
  let long = 0;
  if (errorMsg) {
      text = "ERROR";
   } 
  else if (location) {

      lat = location.coords.latitude;
      long = location.coords.longitude;
  }

  mapMarkers = () =>{
    if(placeResponse){
      console.log(placeResponse);
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