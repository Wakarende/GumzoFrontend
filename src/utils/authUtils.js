import {getAuth, signOut} from 'firebase/auth';
import firebaseApp from '../../firebaseConfig';
import {Alert} from 'react-native';

/**
 * Logs out the current user from Firebase authentication.
 *
 * @param {Function} [navigationCallback] - Optional callback function to handle navigation post-logout.
 */
export function logout(navigationCallback) {
  //Initialize Firebase authentication with app configuration
  const auth = getAuth(firebaseApp);

  //Attempt to sign out the current user
  signOut(auth)
    .then(() => {
      Alert.alert('Signed out');
      if (navigationCallback) {
        navigationCallback();
      }
    })
    .catch(error => {
      console.error('Error signing out: ', error);
    });
}
