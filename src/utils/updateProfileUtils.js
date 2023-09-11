import firebaseApp from '../../firebaseConfig';
import {getAuth} from '@firebase/auth';

export const updateBio = async updatedBio => {
  try {
    const auth = getAuth(firebaseApp);
    const userId = auth.currentUser.uid;

    // Reference to the current user's document in Firebase
    const userRef = firebaseApp.firestore().collection('users').doc(userId);

    // Update the bio field
    await userRef.update({
      bio: updatedBio,
    });

    console.log('Bio updated successfully');
  } catch (error) {
    console.error('Error updating bio:', error);
  }
};
