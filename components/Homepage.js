import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemeProvider, Card, Text, Button } from 'react-native-elements';
import { Pedometer } from 'expo-sensors'

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

    /**
     * This function will refresh the current recommendatiosn and create new ones
     * If no data has changed itll probably just spit out the old ones
     * 
     * It will return a json object that looks like test_hikes above
     */
    const getRecommendations = () => {
        
    }
    
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
                    onPress={() =>navigation.navigate('Map')}
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
