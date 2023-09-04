import {initializeApp} from 'firebase/app';

// Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAq0iYY4kvvNyC8JFIcNcqbXlHEpisJudQ', // replace with your API key
  authDomain: 'gumzofrontend.firebaseapp.com ', // replace with your authDomain
  projectId: 'gumzofrontend',
  storageBucket: 'gumzofrontend.appspot.com', // replace with your storageBucket
  messagingSenderId: '766445832109', // replace with your messagingSenderId
  appId: '1:766445832109:android:2288f4edd981dc3dd1c324', //replace with your appId
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
