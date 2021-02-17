/**
 * This comp will be a card/button that provides a nice looking
 * card that displays mileage, time, difficulty, etc
 * With maybe a nice picture to further embellish it
 */

import React, {useState} from 'react';
import { StyleSheet, View, Pressable} from 'react-native';
import { Card, Icon, Text, Button, BottomSheet } from 'react-native-elements';

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

    console.log(props);
    const { navigation, name, miles, terrain, difficulty, modes } = props;
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
                    <Text h4>{name}</Text>
                </View>
                <View style={{flex: 1, padding: 8}}>
                    <Text style={{fontWeight: '100'}}>
                        <Text style={{backgroundColor: diffColor[difficulty]}}> {difficulty.toUpperCase()} </Text> {terrain} - {timesPressed}
                    </Text>
                </View>
            </View>

            {/* Additional info that pops up when the card is clicked on */}
            <BottomSheet isVisible={isVisible}>
                {/* button to close the popup */}
                <View style={{paddingRight: 16, alignItems: "center"}}>
                    <Icon reverse size={32} name="close" type='evilicon' color="white" reverseColor="black" onPress={()=>setIsVisible(false)}/>
                </View>
                {/* The detail card popup itself */}
                <Card containerStyle={{marginHorizontal: 0, borderTopLeftRadius: 16, borderTopRightRadius: 16, backgroundColor: "linen"}}>
                    <Card.Image source={require("../assets/lake.jpg")}></Card.Image>
                    <Text/> 
                    <Text h3>{name}</Text>
                    <Text style={{}}><Text style={{backgroundColor: diffColor[difficulty]}}> {difficulty.toUpperCase()} </Text> {terrain} - {timesPressed} - {modes}</Text>
                    <Text/> 

                    <Card.Divider/>
                    <Text>Some more in depth description or details can go here</Text>
                    <Text/> 
                    <Button
                        title="Start Hike"
                        onPress={() => navigation.navigate('Map')}>
                    </Button>
                </Card>
            </BottomSheet>
        </Pressable>
    );
}