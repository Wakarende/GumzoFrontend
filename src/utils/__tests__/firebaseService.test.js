import {fetchUsers, fetchCurrentUser} from '../firebaseService';
import {getDocs, getDoc} from '@firebase/firestore';

// Mock the Firebase modules
jest.mock('firebase/firestore');

describe('Firebase Firestore functions', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should fetch all users from Firestore', async () => {
    // Mock data
    const mockUsers = [
      {id: '1', name: 'John'},
      {id: '2', name: 'Jane'},
    ];
    const mockSnapshot = {
      docs: mockUsers.map(user => ({
        id: user.id,
        data: jest.fn().mockReturnValue(user),
      })),
    };

    // Simulate Firestore's behavior
    getDocs.mockResolvedValueOnce(mockSnapshot);

    const result = await fetchUsers();
    expect(result).toEqual(mockUsers);
    expect(getDocs).toHaveBeenCalledTimes(1); // Ensure that `getDocs` was called
  });

  it('should fetch current user data based on UID', async () => {
    // Mock data
    const mockUser = {name: 'John'};
    const mockUserDoc = {
      data: jest.fn().mockReturnValue(mockUser),
    };

    // Simulate Firestore's behavior
    getDoc.mockResolvedValueOnce(mockUserDoc);

    const currentUserId = '1';
    const result = await fetchCurrentUser(currentUserId);
    expect(result).toEqual(mockUser);
    expect(getDoc).toHaveBeenCalledWith(
      expect.anything(),
      'users',
      currentUserId,
    );
  });
});
