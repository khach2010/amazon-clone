import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA8JVlyJVd0K3drRvjHqehkZGvmrJCpLo4',
  authDomain: 'clone-12ef3.firebaseapp.com',
  databaseURL: 'https://clone-12ef3.firebaseio.com',
  projectId: 'clone-12ef3',
  storageBucket: 'clone-12ef3.appspot.com',
  messagingSenderId: '787854163699',
  appId: '1:787854163699:web:881574350bfaddef014186',
  measurementId: 'G-924W8B15H0'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
export { db, auth };
