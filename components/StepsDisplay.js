import React, {useState, useEffect} from 'react';
import { Card, Text } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { View } from 'react-native';
import { Pedometer } from 'expo-sensors'
import firebase from '../Firebase';

export default class StepsDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPedometerAvailable: 'checking',
            pastStepCount: 0,
            currentStepCount: 0,
            stepGoal: 0
        };
    }



    componentDidMount() {
        this._subscribe();
        // Pass data back to parent
        this.props.setStepGoal(this.state.stepGoal);
        this.props.setSteps(this.state.currentStepCount);
    }
    
    componentWillUnmount() {
        this._unsubscribe();
    }

    _subscribe = () => {
        this._subscription = Pedometer.watchStepCount(result => {
            this.setState({
                currentStepCount: result.steps,
            });
        });

        Pedometer.isAvailableAsync().then(
            result => {
                this.setState({
                    isPedometerAvailable: String(result),
                });
            },
            error => {
                this.setState({
                    isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error,
                });
            }
        );

        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 1);
        Pedometer.getStepCountAsync(start, end)
        .then(
            result => {
                this.setState({ pastStepCount: result.steps });
            },
            error => {
                this.setState({
                    pastStepCount: 3210,
                });
                console.error(error);
            }
        )
        .finally(value => this.props.setSteps(this.state.currentStepCount));

        const dbRefObj = firebase.database().ref().child('users');
        dbRefObj.on('value', snap => {
                const users = snap.val();
                this.setState({
                    stepGoal: users[1].DSG
                })
                this.props.setStepGoal(users[1].DSG);
                console.log("Steps Goal: ", users[1].DSG);
            }
        );
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    render() {
        return (
            <View className="container">
            <AnimatedCircularProgress
                size={180}
                width={16}
                fill={this.state.pastStepCount ? this.state.pastStepCount / this.state.stepGoal * 100 : 0}
                padding={16}
                tintColor="#00995FFF"
                backgroundColor="#00995F44">
                {
                    (fill) => (
                    <>
                        <Text h2>{this.state.pastStepCount}</Text>
                        <Text>steps</Text>
                    </>
                    )
                }
                </AnimatedCircularProgress>
            </View>
        )
    }
}