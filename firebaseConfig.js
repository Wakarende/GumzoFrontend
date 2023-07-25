import {initializeApp} from 'firebase/app';

// Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCWKpNvmOn-CC2nF5GfmB5O6ehjImR3ev4', // replace with your API key
  authDomain: 'gumzo-13ac9.firebaseapp.com', // replace with your authDomain
  projectId: 'gumzo-490d6',
  storageBucket: 'gumzo-490d6.appspot.com', // replace with your storageBucket
  messagingSenderId: '55943862298 ', // replace with your messagingSenderId
  appId: '1:55943862298:android:9bd537d59ed13c529559a3', //replace with your appId
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
