import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemeProvider, Card, Text, Button } from 'react-native-elements';

import StepsDisplay from './StepsDisplay';
import HikeCard from './HikeCard';

export default function Homepage({navigation}) {

    const theme = {
        Text: {
            style:{
                fontFamily: 'monospace',
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
                fontFamily: 'monospace',
            },
        }
    }

    const [steps, setSteps] = useState(1234);

    const test_hikes = {
        hikes: [
        {
            name: "Mason Park",
            miles: 3.5,
            terrain: "👟 flat",
            difficulty: "easy",
        },
        {
            name: "Black Star Canyon",
            miles: 5,
            terrain: "🥾 uphill",
            difficulty: "hard",
        },
        {
            name: "Round the block",
            miles: 1.5,
            terrain: "🥾 hilly",
            difficulty: "medium",
        },
        ]
    }

    return (
    <ThemeProvider theme={theme}>
        <ScrollView className="container">
            <Card>
                <Text h1>Welcome</Text>
                <Text h4 style={{color: 'lightgray', fontWeight: '200'}}>{new Date().toDateString()}</Text>
                <StepsDisplay steps={33} goal={100}/>
                <Button
                    onPress={() => navigation.navigate('Map')}
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
                    />
                )}
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
