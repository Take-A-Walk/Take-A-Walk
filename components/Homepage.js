import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { ThemeProvider, Card, Icon, Text, Button } from 'react-native-elements';
import * as Location from 'expo-location';

import StepsDisplay from './StepsDisplay';
import HikeCard from './HikeCard';

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

    const test_photo_url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=ATtYBwKZj0eKVLuRBQyZerMA1yMLYhTekENUPPLqnheV4sNsJ8ERJ94-8u-Dregw3MmIxyn5iyeYdlIGR0QFzPhsEVCuxJ102_pIWXdPX8PrVevRnG22m9YVrr-gJ86hF8woTeasSQMdKIfsvO38jQMgwnnF6ktd7pYgMTYPcwd2DJazhlQ6&key=AIzaSyB0Ckjw0mGcuaUHHTIyx6FW_zqygm-ZIBM"

    
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [placeResponse, setPlaceResponse] = useState(null);
    const [recommendations, setRecommendations] = useState(null);


    const refreshRecommendations = async () => {

        // delete the current recommendations to reset any state
        setRecommendations(null);

        if(placeResponse){

            let hikes = await getDirections(placeResponse.slice(0,3));
            hikes.forEach(hike => console.log(hike.routes[0].legs[0].end_address, hike.routes[0].legs[0].distance));

            let recs = [];
            for(let hike of hikes) {
                let rec = {
                    name:   hike.routes[0].legs[0].end_address.split(',')[0],
                    miles:  hike.routes[0].legs[0].distance.text.split(' ')[0],
                    terrain: "flat",
                    difficulty: hike.routes[0].legs[0].distance.text.split(' ')[0] > 1.0 ? "medium" : "easy",
                    modes: "👟🚲",
                    photo_url:  "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + 
                                hike.place.photos[0].photo_reference + 
                                "&key=AIzaSyB0Ckjw0mGcuaUHHTIyx6FW_zqygm-ZIBM",
                    open_now:   hike.place.opening_hours.open_now,
                    rating:     hike.place.rating,
                    types:      hike.place.types,
                }
                // console.log(rec.name, hike.place.types);
                recs.push(rec);
            }


            // TODO:
            // Movie magic
            // do some sorting, or som

            setRecommendations(recs);
        }
    }


    /**
     * Return a list of directions to the list of places
     * It will return a json object that looks like test_hikes above
     */
     const getDirections = async (places) => {
        if(location === null) {
            console.error("Location has not been determined yet, cannot get recommendations");
            return [];
        }

        console.log("PLACES TO PROCESS:", places.length);
        results = [];
        for(let place of places){
            let direction_url = 'https://maps.googleapis.com/maps/api/directions/json?' +
                                'origin=' + location.coords.latitude + ',' + location.coords.longitude + '&' +
                                'destination=place_id:' + place.place_id + '&' +
                                'key=AIzaSyCCq-BUKz97e_bPfZFIv0HL6SNzJImJQwQ&'
                                'mode=walking';

            console.log("FETCHING URL:", direction_url);

            let response = await fetch(direction_url);
            let directions = await response.json();
            
            // append the place in case we need it
            directions.place = place;
            results.push(directions);
        }

        return results;
    }

    
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
                console.log('Fetching places...');
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
                <Card.Title h3>
                    🏞️ Some Ideas..
                    <Icon size={48} name="refresh" type='fontawesome' color="black" reverseColor="black" onPress={()=>refreshRecommendations()}/>
                </Card.Title>
                <Card.Divider/>
                {recommendations && placeResponse ?
                recommendations.map((hike, index) => 
                    <HikeCard
                        key={index}
                        hike={hike}
                    />
                ) : <Text style={{height: 100, textAlignVertical: 'center', color: 'grey', fontStyle: 'italic'}}>Loading</Text>}
                <Card.Divider/>
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
