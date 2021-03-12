/**
 * This comp will be a card/button that provides a nice looking
 * card that displays mileage, time, difficulty, etc
 * With maybe a nice picture to further embellish it
 */

import React, {useState} from 'react';
import { StyleSheet, View, ScrollView, Pressable} from 'react-native';
import { Card, Icon, Text, Button, BottomSheet, Badge } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        height: 80,
        padding: 0,
        flex: 1,
        flexDirection: "row",
        marginBottom: 16,
        marginHorizontal: 0,
        borderRadius: 8,
        borderTopWidth: 0,
        backgroundColor: "linen",
        elevation: 4,
    },
    mileText: {
        flex: 1,
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: 'darkseagreen'
    },
    closedText: {
        color: 'salmon',
        borderColor: 'salmon',
        borderWidth: 1,
        borderRadius: 2,
        paddingHorizontal: 8,
        paddingVertical: 4,
        width: 70,
    },
    tagText : {
        fontWeight: 'bold',
        borderWidth: 1,
        borderRadius: 8,
        marginRight: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        color: 'grey',
    },
    recommended: {
        color: 'white',
        backgroundColor: 'royalblue',
        width: 128,
        marginLeft: 8,
        padding: 4,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        textAlign: 'center',
        top: -4,
        right: 4,
    }
  });

const diffColor = {
    "easy":   "#228B2233",
    "medium": "#5F9EA044",
    "hard":   "#FF7F5044",
}


export default function HikeCard(props) {

    // console.log(props);
    const { navigation, location, errorMsg, placeResponse, finishWalkCallback } = props;
    const { name, miles, terrain, difficulty, modes, photo_url, open_now, types, recommended } = props.hike;
    const [timesPressed, setTimesPressed] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    console.log("rec", recommended);

    return(
        <Pressable
            style={styles.container}
            onPress={() => {
                setTimesPressed((current) => current + 1);
                setIsVisible(true);
            }}
        >
            {/* Optional badge to indicate a "recommended" hike */}
            {recommended &&
            <Badge
                value="✨ RECOMMENDED"
                status="primary"
                containerStyle={{ position: 'absolute', top: -12, right: -4}}
                badgeStyle={{padding: 4, paddingBottom: 4, height: 24, backgroundColor: 'royalblue', elevation: 10}}
            />}

            {/* The larger mileage part */}
            <View style={styles.mileText}>
                <Text h2 style={{fontSize: 36, fontWeight: 'bold' }}>{miles}</Text>
                <Text style={{fontSize: 12, fontWeight: 'normal'}}>miles</Text>
            </View>

            {/* The name and stuff */}
            <View style={{flex: 3, flexDirection: "column"}}>
                <View style={{flex: 1, padding: 8}}>
                    <Text h4 ellipsizeMode="tail" numberOfLines={1}>{name}</Text>
                </View>
                <View style={{flex: 1, padding: 8}}>
                    <Text style={{fontWeight: '100'}}>
                        <Text style={{backgroundColor: diffColor[difficulty]}}> {difficulty.toUpperCase()} </Text> {terrain} - {modes}
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
                    <Card.Image source={photo_url ? {uri: photo_url} : require("../assets/lake.jpg")}></Card.Image>
                    <Text/> 
                    {open_now === false && <Text style={styles.closedText}>CLOSED</Text>}
                    <Text h3>{name}</Text>
                    <Text style={{}}><Text style={{backgroundColor: diffColor[difficulty]}}> {difficulty.toUpperCase()} </Text> {terrain} - {timesPressed} - {modes}</Text>
                    <Text/> 
                    <View style={{ flexDirection: "row"}}>
                        {types.map(tag =>
                            <Text style={styles.tagText}>{tag.split('_').join(' ')}</Text>)}
                    </View>
                    <Text/> 

                    <Card.Divider/>

                    <Text>No details available</Text>
                    <Text/> 
                    <Button
                        title="Hike It"
                        onPress={() => finishWalkCallback({place: name, date: new Date().toDateString()})}
                        >
                    </Button>
                </Card>
            </BottomSheet>
        </Pressable>
    );
}