import { Platform } from 'react-native';
import React, {useState, useEffect} from 'react';
import GLOBAL from '../global.js'

import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileImage() {

    const [avatar, setAvatar] = useState();

    useEffect(() => {
        (async () => {
        try {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                // if (status !== 'granted') {
                //     alert('Sorry, we need camera roll permissions to make this work!');
                // }
            }
        }finally{

        }
        })();
      }, []);

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setAvatar(result.uri);
          GLOBAL.profileImage = result.url;
        }
      };
    
    return(
        <Avatar
        size="xlarge"
        rounded
        icon={{name: 'user', type: 'font-awesome'}}
        // source={avatar && {uri: avatar}}
        source={{uri: "https://sites.rutgers.edu/acal51/wp-content/uploads/sites/291/2017/12/3859882-6269102771-Bruce.jpg"}}
        onPress={pickImage}
        containerStyle={{
            marginVertical: 60,
            marginHorizontal: 100,
            backgroundColor: 'grey',
        }}
        />
    );
}