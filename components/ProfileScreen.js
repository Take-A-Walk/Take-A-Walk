import React, { useState, useEffect } from 'react';
import { Avatar, Card } from 'react-native-elements';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ProfileImage from './ProfileImage';
import { Button, CardSection, Input, Spinner } from './common';
// import firebaseDB from '../apis/firebaseDB';
import firebase from '../Firebase';

export default function ProfileScreen() {
    const [user, setUser] = useState([]);
    const cardStyle = {height: 100, backgroundColor: "powderblue"};

    // initial render
    useEffect(() => {
        console.log('initial render');
        const dbRefObj = firebase.database().ref().child('users');
        dbRefObj.on('value', snap => {
                const users = snap.val();
                setUser(users[1]);
            }
        );
        // console.log(dbRefObj.child('1'));
    }, [])

    // following renders
    useEffect(() => {
        console.log('following renders');
        const dbRefObj = firebase.database().ref().child('users/4');
        console.log(dbRefObj);
        // dbRefObj.update({
        //     name: "dunkey",
        //     age: "21",
        //     height: 
        // })

        return function cleanup() {
            const dbRefObj = firebase.database().ref().child('users');
            console.log(dbRefObj);
        };
    })

    const saveProfile = (userName, age, height, dgs) => {
        const dbRefObj = firebase.database().ref().child('users');
        console.log(dbRefObj);
    }

    const styles = StyleSheet.create({
        button: {
          alignItems: 'center',
          backgroundColor: "#ADD8E6",
          padding: 10,
        }
    });
    
    return(
        <Card containerStyle={cardStyle}>
            <ProfileImage />
            <CardSection>
                <Input
                    label={"Name"}
                    value={user ? user.name : "Joe Smith"}
                    onChangeText={name => setUser({...user, 'name': name})}
                    placeholder={"Name"}
                    pwObstruct={false}
                />
            </CardSection>
            <CardSection>
                <Input
                    label={"Age"}
                    value={user ? String(user.age) : "22"}
                    onChangeText={age => setUser({...user, 'age': age})}
                    placeholder={"Age"}
                    pwObstruct={false}
                />
            </CardSection>
            <CardSection>
                <Input
                    label={"Height"}
                    value={user ? user.height : "5'9\""}
                    onChangeText={height => setUser({...user, 'height': height})}
                    placeholder={"Height"}
                    pwObstruct={false}
                />
            </CardSection>
            <CardSection>
                <Input
                    label={"Daily Step Goal"}
                    value={user ? String(user.DSG) : "6000"}
                    onChangeText={dsg => setUser({...user, 'DSG': dsg})}
                    placeholder={"Daily Step Goal"}
                    pwObstruct={false}
                />
                <TouchableOpacity style={styles.button} onPress={() => saveProfile(user.name, user.age, user.height, user.DSG)}>
                    <Text>Save</Text>
                </TouchableOpacity>
            </CardSection>
        </Card>
    );
};