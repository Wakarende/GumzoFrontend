import {
  addDoc,
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  serverTimestamp,
} from '@firebase/firestore';
import firebaseApp from '../../firebaseConfig';
import {sendMatchRequestNotification} from './sendMatchRequest';

/**
 * Sends a match request from the current user to a selected user.
 *
 * @param {Object} selectedUser - The user to whom the match request is being sent.
 * @param {Object} currentUser - The currently authenticated user sending the request.
 * @returns {Object} An object indicating the status of the match request operation.
 */
export const sendMatchRequest = async (selectedUser, currentUser) => {
  const db = getFirestore(firebaseApp);

  // Set up a query to check if a match request already exists between the current user and the selected user
  const matchRequestQuery = query(
    collection(db, 'matchRequests'),
    where('senderId', '==', currentUser.uid),
    where('recieverId', '==', selectedUser.id),
  );

  const querySnapshot = await getDocs(matchRequestQuery);
  if (!querySnapshot.empty) {
    return {status: 'already_exists'};
  }

  // Send a notification to the selected user for the match request
  const notificationSuccess = await sendMatchRequestNotification(
    selectedUser.id,
    currentUser.uid,
  );
  const matchRequestsCollection = collection(db, 'matchRequests');
  // Add the match request to the 'matchRequests' collection
  await addDoc(matchRequestsCollection, {
    senderId: currentUser.uid,
    recieverId: selectedUser.id,
    status: 'pending',
    timestamp: serverTimestamp(),
  });

  return {status: notificationSuccess ? 'success' : 'notification_failed'};
};
