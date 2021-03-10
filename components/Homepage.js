import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemeProvider, Card, Text, Button } from 'react-native-elements';
import * as Location from 'expo-location';

import StepsDisplay from './StepsDisplay';
import HikeCard from './HikeCard';
import MapDisplay from './MapDisplay';

export default function Homepage({navigation}) {
    const theme = {
        Text: {
            style:{
                // fontFamily: 'monospace',
            }
        },
        NOTCard: {
            containerStyle: {
                backgroundColor: 'linen',
                alignItems: 'center',
                textAlign: 'center',
            }
        },
        Button: {
            titleStyle: {
                // fontFamily: 'monospace',
            },
        }
    }
    const test_hikes = {
        hikes: [
        {
            name: "Mason Park",
            miles: 3.5,
            terrain: "flat",
            difficulty: "easy",
            modes: "👟🚲🛴",
        },
        {
            name: "Black Star Canyon",
            miles: 5,
            terrain: "uphill",
            difficulty: "hard",
            modes: "🥾🚲",
        },
        {
            name: "Round the block",
            miles: 1.5,
            terrain: "hilly",
            difficulty: "medium",
            modes: "👟🚲",
        },
        ]
    };

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [placeResponse, setPlaceResponse] = useState(null);

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
            // fetchPlacesAPI();
        } catch(err) {
            console.log(err);
        }
    }
    
    const fetchPlacesAPI = () => {
        let radius = 2000;
        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + location.coords.latitude + ',' + location.coords.longitude + '&radius=' + radius + '&type=park' + '&key=' + "AIzaSyB0Ckjw0mGcuaUHHTIyx6FW_zqygm-ZIBM"
    
        fetch(url)
          .then(res => res.json())
          .then(data => {
              console.log('in here');
            //   console.log(data);
           setPlaceResponse(data.results);
          })
          .catch(console.error)
    }

    // single render only
    useEffect(() => {
        getMapData();
    }, [])

    // renders whenever
    useEffect(() => {
        if (location) {
            fetchPlacesAPI();
        }
    }, [location])

    // always runs
    useEffect(() => {
        // console.log(placeResponse);
    })

    return (
    <ThemeProvider theme={theme}>
        <ScrollView className="container">
            <Card containerStyle={{alignItems: "center"}}>
                <Text h1>Irvine, CA</Text>
                <Text h4 style={{color: 'lightgray', fontWeight: '200'}}>{new Date().toDateString()}</Text>
                <StepsDisplay goal={6000}/>
                <Text/>
                <Button
                    onPress={() => navigation.navigate('Profile')}
                    title="View Profile"
                    color="#841584"
                    accessibilityLabel="View your personal details"
                />
            </Card>
            <Card>
                <Card.Title h3>🏞️ Some Ideas...</Card.Title>
                <Card.Divider/>
                {test_hikes.hikes.map(hike => 
                    <HikeCard
                        key={hike.name}
                        name={hike.name}
                        miles={hike.miles}
                        terrain={hike.terrain}
                        difficulty={hike.difficulty}
                        modes={hike.modes}
                    />
                )}
                <Button 
                    onPress={() => navigation.navigate('Map', {location, errorMsg, placeResponse})}
                    title = "View Map"
                    color = "#841584"
                />
            </Card>
            <Card>
                <Card.Title h3>Your History</Card.Title>
                <Card.Divider/>
                <Text>This area will contain cards and stuff detailing the week's activity</Text>
                <Card.Divider/>
                <Button title="View Last Walk"></Button>
            </Card>
        </ScrollView>
    </ThemeProvider>
  );
}
