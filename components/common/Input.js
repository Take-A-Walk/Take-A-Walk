import React, { useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, pwObstruct }) => {
    const { inputField, labelStyle, containerStyle } = styles;

    // useEffect(() => {
    //     console.log('Input rendered!');
    // })

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                value={value}
                style={inputField}
                placeholder={placeholder}
                autoCorrect={false}
                onChangeText={onChangeText}
                secureTextEntry={pwObstruct}
            />
        </View>
    );
};

const styles = {
    inputField: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 20,
        fontSize: 18,
        lineHeight: 23,
        flex: 4
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 2
    },
    containerStyle: {
        height: 50,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export { Input };
