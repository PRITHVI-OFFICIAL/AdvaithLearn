import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

const firebaseConfig = {
    apiKey: "AIzaSyB4Gygq6eN0Wc_sI_zb9d485urlM36tM4A",
    authDomain: "navigobus.firebaseapp.com",
    projectId: "navigobus",
    storageBucket: "navigobus.appspot.com",
    messagingSenderId: "265582428505",
    appId: "1:265582428505:web:5bba5c37a07312194d4c48"
  };

// initialize firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getFirestore();