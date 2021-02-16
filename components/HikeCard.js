/**
 * This comp will be a card/button that provides a nice looking
 * card that displays mileage, time, difficulty, etc
 * With maybe a nice picture to further embellish it
 */

import React, {useState} from 'react';
import { StyleSheet, View, Pressable} from 'react-native';
import { Text, Button, BottomSheet } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        height: 80,
        padding: 0,
        flex: 1,
        flexDirection: "row",
        marginVertical: 8,
        marginHorizontal: 0,
        borderRadius: 8,
        borderTopWidth: 0,
        backgroundColor: "linen",
    },
    mileText: {
        flex: 1,
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: 'darkseagreen'},
  });

const diffColor = {
    "easy":   "#228B2233",
    "medium": "#5F9EA044",
    "hard":   "#FF7F5044",
}


export default function HikeCard(props) {

    const { name, miles, terrain, difficulty } = props;
    const [timesPressed, setTimesPressed] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    return(
        <Pressable
            style={styles.container}
            onPress={() => {
                setTimesPressed((current) => current + 1);
                setIsVisible(true);
            }}
        >
            {/* The larger mileage part */}
            <View style={styles.mileText}>
                <Text h2 style={{fontSize: 36, fontWeight: 'bold'}}>{miles}</Text>
                <Text style={{fontSize: 12, fontWeight: 'normal'}}>miles</Text>
            </View>
            {/* The name and stuff */}
            <View style={{flex: 3, flexDirection: "column"}}>
                <View style={{flex: 1, padding: 8}}>
                    <Text h4>{name} - {timesPressed}</Text>
                </View>
                <View style={{flex: 1, padding: 8}}>
                    <Text style={{fontWeight: '100'}}>
                        <Text style={{backgroundColor: diffColor[difficulty]}}> {difficulty.toUpperCase()} </Text> {terrain}
                    </Text>
                </View>
            </View>

            {/* Additional info that pops up when clicked on */}
            <BottomSheet isVisible={isVisible}>
                <View>
                    <Text h1> TODO: Link to map</Text>
                    <Button title="Start Hike?" onPress={() => setIsVisible(false)}></Button>
                </View>
            </BottomSheet>
        </Pressable>
    );
}