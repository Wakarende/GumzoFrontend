import firestore from '@react-native-firebase/firestore';

/**
 * Sends a match request notification to a recipient user.
 *
 * @param {string} recipientUserId - The ID of the user to whom the notification should be sent.
 * @param {string} senderUserId - The ID of the user sending the match request.
 * @return {boolean} - True if the notification was sent successfully, false otherwise.
 */
export const sendMatchRequestNotification = async (
  recipientUserId,
  senderUserId,
) => {
  try {
    const notificationRef = firestore()
      .collection('users')
      .doc(recipientUserId)
      .collection('notifications')
      .doc(); // this will auto-generate a new notification ID

    await notificationRef.set({
      type: 'match_request',
      fromUserID: senderUserId,
      timestamp: firestore.FieldValue.serverTimestamp(),
      // ... any other necessary details
    });

    return true; // or return the notification data, based on your needs
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
};
