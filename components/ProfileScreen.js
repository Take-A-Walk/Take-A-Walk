import React, { useState, useEffect } from 'react';
import { Avatar, Card } from 'react-native-elements';
import ProfileImage from './ProfileImage';
import { Button, CardSection, Input, Spinner } from './common';
// import firebaseDB from '../apis/firebaseDB';
import firebase from '../Firebase';

export default function ProfileScreen() {
    const [user, setUser] = useState([]);
    // const fetchUser = async () => {
    //     try {
    //         const res = await firebaseDB.get('/users.json');
    //         console.log(res);
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }

    // initial render
    useEffect(() => {
        console.log('initial render');
        const dbRefObj = firebase.database().ref().child('users');
        dbRefObj.on('value', snap => {
                const users = snap.val();
                setUser(users[2]);
                // console.log(snap.val())
            }
        );
    }, [])

    // following renders
    useEffect(() => {
        console.log('following renders');
        console.log(user);
    })
    
    return(
        <Card>
            <ProfileImage />
            <CardSection>
                <Input
                    label={"Name"}
                    // value={user.length > 0 ? users[2].name : "Joe Smith"}
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
            </CardSection>
        </Card>
    );
};