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
export const sendMatchRequest = async (selectedUser, currentUser) => {
  const db = getFirestore(firebaseApp);
  const matchRequestQuery = query(
    collection(db, 'matchRequests'),
    where('senderId', '==', currentUser.uid),
    where('recieverId', '==', selectedUser.id),
  );

  const querySnapshot = await getDocs(matchRequestQuery);
  if (!querySnapshot.empty) {
    return {status: 'already_exists'};
  }

  const notificationSuccess = await sendMatchRequestNotification(
    selectedUser.id,
    currentUser.uid,
  );
  const matchRequestsCollection = collection(db, 'matchRequests');
  await addDoc(matchRequestsCollection, {
    senderId: currentUser.uid,
    recieverId: selectedUser.id,
    status: 'pending',
    timestamp: serverTimestamp(),
  });

  return {status: notificationSuccess ? 'success' : 'notification_failed'};
};
