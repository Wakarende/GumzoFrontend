import {getFirestore, doc, updateDoc} from 'firebase/firestore';

//local imports
import firebaseApp from '../../firebaseConfig';

/**
 * Updates a specific user's profile data in the Firestore 'users' collection.
 *
 * @param {string} userId - The unique ID of the user to be updated.
 * @param {Object} updatedData - The data that will replace/update existing user profile data.
 */
export const updateUserProfile = async (userId, updatedData) => {
  const db = getFirestore(firebaseApp);
  const userRef = doc(db, 'users', userId);

  await updateDoc(userRef, updatedData);
};
