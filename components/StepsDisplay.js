import React, {useState, useEffect} from 'react';
import { Card, Text } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { View } from 'react-native';


export default function StepsDisplay(props) {

    const { steps, goal } = props;

    
    return(
        <View className="container">
            <AnimatedCircularProgress
                size={180}
                width={16}
                fill={steps/goal * 100}
                padding={16}
                tintColor="#00995FFF"
                backgroundColor="#00995F44">
                {
                    (fill) => (
                    <>
                    <Text h2>{steps}</Text>
                    <Text>steps</Text>
                    </>
                    )
                }
                </AnimatedCircularProgress>
        </View>
    );
}