import {addDoc, doc, collection, updateDoc} from '@firebase/firestore';

/**
 * Accepts a match request.
 *
 * @param {string} requestId - The ID of the match request.
 * @param {string} senderId - The ID of the user who sent the match request.
 * @param {Object} firestore - The Firestore instance.
 * @param {string} currentUserId - The ID of the currently authenticated user.
 */
export const acceptMatch = async (
  requestId,
  senderId,
  firestore,
  currentUserId,
) => {
  try {
    //Create a new match in the matches collection
    const matchRef = collection(firestore, 'matches');
    await addDoc(matchRef, {
      user1: currentUserId,
      user2: senderId,
      timestamp: new Date().toISOString(),
    });
    //Update the original request from matchRequests collection
    const requestRef = doc(firestore, 'matchRequests', requestId);
    await updateDoc(requestRef, {
      status: 'accepted',
    });
    console.log('Match accepted and Document successfully update!');
  } catch (error) {
    console.error('Error handling match approval: ', error);
  }
};

//Logic to deny match request
export const denyMatchRequest = async (requestId, senderId, firestore) => {
  console.log(`Denying request with ID: ${requestId} from sender: ${senderId}`);
  try {
    //Update matchRequest in matchRequest collection
    const requestRef = doc(firestore, 'matchRequests', requestId);
    await updateDoc(requestRef, {
      status: 'denied',
    });
    console.log('Match request denied!');
  } catch (error) {
    console.log('Error handling match denial:', error);
  }
};
