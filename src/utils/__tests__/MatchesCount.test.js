import {renderHook, waitFor} from '@testing-library/react';
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
} from '@firebase/firestore';
import useMatchesCount from '../MatchesCount'; // Replace with your actual file path.
import firebaseApp from '../../../firebaseConfig';

// Mock Firebase functions
jest.mock('@firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  where: jest.fn(),
  query: jest.fn(),
  getDocs: jest.fn(),
}));

//Mock ReactNativeAsyncStorage
jest.mock('@firebase/auth', () => ({
  ...jest.requireActual('@firebase/auth'),
  getReactNativePersistence: jest.fn(),
}));
describe('useMatchesCount', () => {
  beforeEach(() => {
    // Reset all mock function call counters before each test
    jest.clearAllMocks();
  });

  it('returns the count of matchRequests for a user', async () => {
    // Sample user object
    const mockUser = {
      uid: 'sampleUID',
    };

    // Mock Firebase responses
    getFirestore.mockReturnValueOnce({});
    collection.mockReturnValueOnce('mockCollectionReference');
    where.mockReturnValueOnce('mockWhereReference');
    getDocs.mockResolvedValueOnce({
      size: 5, // Mocking 5 matches found
    });

    // Render the hook with our mock user
    const {result, waitForNextUpdate} = renderHook(() =>
      useMatchesCount(mockUser),
    );

    // Wait for useEffect to complete
    await waitFor(() => result.current === 5);

    // Check that the returned count matches our mock
    expect(result.current).toBe(5);
  });

  it('returns 0 when there is no user', () => {
    // Render the hook without a user
    const {result} = renderHook(() => useMatchesCount(null));

    // Check that the returned count is 0
    expect(result.current).toBe(0);
  });
});
