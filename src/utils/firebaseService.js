import {getFirestore, collection, getDocs} from '@firebase/firestore';
import {doc, getDoc} from '@firebase/firestore';
import firebaseApp from '../../firebaseConfig';

//Function to fetch all users from the 'users' collection in Firestore
export const fetchUsers = async () => {
  //Initialize Firestore database
  const db = getFirestore(firebaseApp);
  //Reference the 'users' collection
  const usersCollection = collection(db, 'users');
  //Fetch and store all documents from the 'users' collection
  const usersSnapshot = await getDocs(usersCollection);
  //Convert each document to an object with an 'id' and the rest of its data
  const users = usersSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  return users;
};

/**
 * Fetches the data for a specific user based on the provided user ID from the Firestore database.
 *
 * @param {string} currentUserId - The user ID of the user whose data is to be fetched.
 * @returns {Object} The data of the specified user or undefined if the user is not found.
 */
export const fetchCurrentUser = async currentUserId => {
  const db = getFirestore(firebaseApp);
  //Get the document of the user with provided ID
  const userDoc = await getDoc(doc(db, 'users', currentUserId));
  return userDoc.data();
};
