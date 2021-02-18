import firebase from 'firebase';
import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Card, CardSection, Input, Spinner } from './common';
// import './common/index.scss';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {errorStyle, titleView, titleText} = styles;

    useEffect(() => {
        console.log('rendered!');
    })

    const onButtonPress = () => {
        console.log('here');

        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .catch(() => {
                        setError('Authetnication Failed');
                    });
            });
    }

    // render spinner or button
    const renderBtn = () => {
        if (loading) {
            return <Spinner size="small" />;
        }

        return (
            <Button onPress={onButtonPress}>Log in</Button>
        )
    }

    return (
        <Card>
            <CardSection>
                <View style={titleView}>
                    <Text style={titleText}>Take a Walk!</Text>
                </View>
            </CardSection>
            <CardSection>
                <Input 
                    label={"Email"}
                    value={email}
                    onChangeText={email => setEmail(email)}
                    placeholder={"example@email.com"}
                    pwObstruct={false}
                />
            </CardSection>

            <CardSection>
                <Input
                    label="Password"
                    placeholder="Password"
                    value={password}
                    onChangeText={password => setPassword(password)}
                    pwObstruct={true}
                />
            </CardSection>

            <Text style={errorStyle}>
                {error}
            </Text>

            <CardSection>
                {renderBtn()}
            </CardSection>
        </Card>
    );
};

const styles = {
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
        backgroundColor: "#fff"
    },
    titleView: {
        height: 280,
        width: '100%',
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 60,
        justifySelf: 'center'
    }
}

export default LoginForm;