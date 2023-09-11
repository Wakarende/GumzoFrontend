import {getAuth, signOut} from 'firebase/auth';
import firebaseApp from '../../firebaseConfig';

export function logout(navigationCallback) {
  const auth = getAuth(firebaseApp);
  signOut(auth)
    .then(() => {
      console.log('User signed out');
      if (navigationCallback) {
        navigationCallback();
      }
    })
    .catch(error => {
      console.error('Error signing out: ', error);
    });
}
