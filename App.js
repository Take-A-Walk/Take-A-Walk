import { StatusBar } from 'expo-status-bar';
import React, {Component}from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';

export default class App extends Component{
  state = {
    location: null,
    errorMessage: null
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
  }



  render(){
    let text = 'Waiting..';
    let lat = 0;
    let long = 0;
    if(this.state.errorMessage){
      text = this.state.errorMessage
    }
    else if(this.state.location){
      text = this.state.location.coords.latitude;
      lat = this.state.location.coords.latitude;
      long = this.state.location.coords.longitude;
      //lat = JSON.stringify(this.state.location.coords.latitude);
      //long = JSON.stringify(this.state.location.coords.longitude);
    }
      return (
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
          pinColor = {"blue"}
          coordinate = {{
            latitude: lat,
            longitude: long
          }}
          title = {"MY CURRENT LOCATION"}
          description = {"WHERE SHOULD I GO RUNNING TODAY?"}
        />
      </MapView>
      
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
