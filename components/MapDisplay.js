import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableHighlightBase, View } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Card } from 'react-native-elements';
import * as Location from 'expo-location';

export default function MapDisplay() {
  

  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [placeResponse, setPlaceResponse] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPlaces, setLoadingPlaces] = useState(true);

    //For user location
    useEffect(() => {
        getMapData();
        fetchPlacesAPI();
    }, []);

    //Maybe move this to the front before logging in?
    const getMapData = async () => {
        try {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                //alert('Sorry, we need camera roll permissions to make this work!');
                setErrorMsg('Sorry we need your location for the app to work!');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
            setLocation(location);
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
            setLoadingUser(false);
        } catch(err) {
            console.log(err);
        }
    }

  //this.fetchPlacesAPI(location.coords.latitude, location.coords.longitude);
  
  const fetchPlacesAPI = async (lat, long) => {

      let radius = 2000;

      const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + long + '&radius=' + radius + '&type=park' + '&key=' + "AIzaSyB0Ckjw0mGcuaUHHTIyx6FW_zqygm-ZIBM"

      fetch(url)
        .then(res => res.json())
        .then(data => {
          let places = [] // hold the places
          for(let googlePlace of data.results){
            let place = {}

            let coords = {
              latitude: googlePlace.geometry.location.lat,
              longitude: googlePlace.geometry.location.lng
            }

            place['coords'] = coords

            places.push(place)
          }
          console.log(places);
          setLoadingPlaces(false);

          setPlaceResponse(places);
        })
        .catch(console.error)
  }
  

  let text = "Waiting...";
  let lat = 0;
  let long = 0;
  let response = [];
  if (errorMsg) {
      text = "ERROR";
   } 
  else if (location) {

      lat = latitude;
      long = longitude;
      response = placeResponse;
  }


  const showMap = (lat, long) =>{
        // if at least one of 'lat' or 'long' doesn't exist (both must exist to render)
        if (!lat || !long) {
            return (
                <Text>Please add Location</Text>
            )
        } else {
            return(
                <MapView 
                    provider = {PROVIDER_GOOGLE}
                    style = {styles.map} 
                    region = {{
                        latitude:  lat,
                        longitude: long,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.035
                    }}
                    showsUserLocation = {true}>
                <MapView.Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -110.342}}
                    title={"title"}
                    description={"description"}
                />
                </MapView>
            );
        }
  }
  
  const showPlacesData = (response) =>{
    console.log(response);
    let nearbyCoords = [];
    if(response !== null){
      for(let place of response){
        nearbyCoords.push(<Text>{place.coords.latitude}</Text>)
      }
      return (
        nearbyCoords
      );
    }
    else{
      return(
        <Text>OOps</Text>
      );
    }
  }
  

  //Loading everything on the screen
  if(loadingUser){
    return(
      <View>
        {/* {showMap(0, 0)} */}
        {showMap(lat, long)}
      </View>
    );
  }
  
  if(loadingPlaces){
    return(
      <Text>Data is loaded.</Text>
    );
  }
  return(
    <Text>Loading Coords on map!</Text>
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
    height: '80%'
  }
});