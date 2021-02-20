import firebase from 'firebase';
import {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId} from "./fb_config";

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
};

// init app

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

export default firebase;