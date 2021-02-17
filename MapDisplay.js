import { StatusBar } from 'expo-status-bar';
import React, {Component}from 'react';
import { StyleSheet, Text, TouchableHighlightBase, View } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';

export default class MapDisplay extends Component{
  state = {
    location: null,
    errorMessage: null,
    response:null
  };

  //works for iOS emulator/emulator / Android device
  //runs before the DOM actually loads
  async componentDidMount(){
    const {status } = await Location.requestPermissionsAsync();

    if(status !== 'granted'){
      const response = await Location.requestPermissionsAsync();
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });

    this.fetchPlacesAPI(location.coords.latitude, location.coords.longitude);
  }

  fetchPlacesAPI = (lat, long) =>{
      let radius = 20;

      const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + long + '&radius=' + radius + '&key=' + "AIzaSyB0Ckjw0mGcuaUHHTIyx6FW_zqygm-ZIBM"
  
      let response = fetch(url);

      if(response.ok){
        let rep = response.json();
        this.setState({rep});
      }
      else{
        alert("HTTP ERROR: " + response.status);
      }

    }

  render(){
    let text = 'Waiting..';
    let lat = 0;
    let long = 0;
    if(this.state.errorMessage){
      text = this.state.errorMessage
    }
    else if(this.state.location){
      lat = this.state.location.coords.latitude;
      long = this.state.location.coords.longitude;
      text = JSON.stringify(this.state.response);
      //lat = JSON.stringify(this.state.location.coords.latitude);
      //long = JSON.stringify(this.state.location.coords.longitude);
    }
      return (
        /*
        <MapView.Marker 
          pinColor = {"blue"}
          coordinate = {{
            latitude: lat,
            longitude: long
          }}
          title = {"MY CURRENT LOCATION"}
          description = {"WHERE SHOULD I GO RUNNING TODAY?"}
        />
      </MapView>
      */
      <View style = {styles.container}>
        <MapView 
       provider = {PROVIDER_GOOGLE}
       style = {styles.map} 
       region = {{
         latitude:  lat,
         longitude: long,
         latitudeDelta: 0.09,
         longitudeDelta: 0.035
      }}
      showsUserLocation = {true}></MapView>
       <Text>text</Text>
     </View>

      
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome:{
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  map:{
    height: '50%'
  }
});