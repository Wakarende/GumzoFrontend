import {sendMatchRequestNotification} from '../sendMatchRequest';
import firestore from '@react-native-firebase/firestore';

// Mocking firestore methods
jest.mock('@react-native-firebase/firestore', () => {
  return () => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        collection: jest.fn(() => ({
          doc: jest.fn(() => ({
            set: jest.fn(),
          })),
        })),
      })),
    })),
    FieldValue: {
      serverTimestamp: jest.fn(),
    },
  });
});

describe('sendMatchRequestNotification', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  it('successfully sends a match request notification', async () => {
    const recipientUserId = 'recipientId123';
    const senderUserId = 'senderId123';

    const result = await sendMatchRequestNotification(
      recipientUserId,
      senderUserId,
    );

    expect(firestore().collection).toHaveBeenCalledWith('users');
    expect(firestore().collection().doc).toHaveBeenCalledWith(recipientUserId);
    expect(firestore().collection().doc().collection).toHaveBeenCalledWith(
      'notifications',
    );
    expect(
      firestore().collection().doc().collection().doc().set,
    ).toHaveBeenCalledWith({
      type: 'match_request',
      fromUserID: senderUserId,
      timestamp: expect.any(Function), // because it's a mocked function
      // ... any other necessary details
    });

    expect(result).toBe(true);
  });

  it('returns false and logs an error on failure', async () => {
    // Force the set method to throw an error
    firestore()
      .collection()
      .doc()
      .collection()
      .doc()
      .set.mockRejectedValueOnce(new Error('An error occurred'));

    console.error = jest.fn(); // Mock the console.error to check if it's been called

    const result = await sendMatchRequestNotification(
      'recipientId123',
      'senderId123',
    );

    expect(console.error).toHaveBeenCalledWith(
      'Error sending notification:',
      new Error('An error occurred'),
    );
    expect(result).toBe(false);
  });
});
