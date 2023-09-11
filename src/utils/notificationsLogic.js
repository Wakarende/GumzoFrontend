import {query, collection, where, onSnapshot} from '@firebase/firestore';

export const initializeNotificationListener = (
  firestore,
  currentUser,
  setNotifications,
) => {
  const matchRequestRef = query(
    collection(firestore, 'matchRequests'),
    where('recieverId', '==', currentUser.uid),
    // only listen for requests that have their status changed
    where('status', 'in', ['pending', 'accepted', 'denied']),
  );

  const unsubscribeFromUpdates = onSnapshot(matchRequestRef, snapshot => {
    if (!snapshot.empty) {
      // Update the notification count based on the snapshot size
      setNotifications(snapshot.size);
    }
  });
  return unsubscribeFromUpdates;
};
