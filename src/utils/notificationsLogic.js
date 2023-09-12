import {query, collection, where, onSnapshot} from '@firebase/firestore';

/**
 * Initializes a listener for notifications related to match requests.
 *
 * @param {Object} firestore - The Firestore instance.
 * @param {Object} currentUser - The currently authenticated user's data.
 * @param {Function} setNotifications - Function to update the UI with the new notification count.
 * @return {Function} - A function that, when called, will unsubscribe the listener.
 */
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
