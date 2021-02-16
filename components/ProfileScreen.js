import React, {useState} from 'react';
import { Avatar } from 'react-native-elements';

export default function ProfileScreen() {

    const [avatar, setAvatar] = useState();
    
    return(
        <Avatar
        size="xlarge"
        rounded
        icon={{name: 'user', type: 'font-awesome'}}
        source={avatar && {uri: avatar}}
        // onPress={pickImage}
        containerStyle={{marginVertical: 60, marginHorizontal: 66, backgroundColor: 'grey',}}
        />
    );
}