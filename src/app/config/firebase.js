import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCjesKVj82XxEktkNlIyse1gnXy3CmLkJo",
    authDomain: "revent-zaman.firebaseapp.com",
    projectId: "revent-zaman",
    storageBucket: "revent-zaman.appspot.com",
    messagingSenderId: "344815396230",
    appId: "1:344815396230:web:cbb72c758fa0c69bb37807"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;