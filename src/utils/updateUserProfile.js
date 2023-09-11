import {getFirestore, doc, updateDoc} from 'firebase/firestore';

//local imports
import firebaseApp from '../../firebaseConfig';

export const updateUserProfile = async (userId, updatedData) => {
  const db = getFirestore(firebaseApp);
  const userRef = doc(db, 'users', userId);

  await updateDoc(userRef, updatedData);
};
