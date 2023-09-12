import {acceptMatch, denyMatchRequest} from '../matchUtils'; // Replace with your actual file path.
import {addDoc, doc, collection, updateDoc} from '@firebase/firestore';

// Mock Firebase functions
jest.mock('@firebase/firestore', () => ({
  addDoc: jest.fn(),
  doc: jest.fn(() => 'mockDocReference'),
  collection: jest.fn(() => 'mockCollectionReference'),
  updateDoc: jest.fn(),
}));

describe('Match functions', () => {
  beforeEach(() => {
    // Reset all mock function call counters before each test
    jest.clearAllMocks();
  });

  it('accepts a match request', async () => {
    const mockFirestore = {};
    const mockRequestId = 'request123';
    const mockSenderId = 'sender123';
    const mockCurrentUserId = 'user456';

    await acceptMatch(
      mockRequestId,
      mockSenderId,
      mockFirestore,
      mockCurrentUserId,
    );

    // Check if collection was called with 'matches'
    expect(collection).toHaveBeenCalledWith(mockFirestore, 'matches');

    // Check if addDoc was called with expected arguments
    expect(addDoc).toHaveBeenCalledWith('mockCollectionReference', {
      user1: mockCurrentUserId,
      user2: mockSenderId,
      timestamp: expect.any(String),
    });

    // Check if doc was called with 'matchRequests' and requestId
    expect(doc).toHaveBeenCalledWith(
      mockFirestore,
      'matchRequests',
      mockRequestId,
    );

    // Check if updateDoc was called with expected arguments
    expect(updateDoc).toHaveBeenCalledWith('mockDocReference', {
      status: 'accepted',
    });
  });

  it('denies a match request', async () => {
    const mockFirestore = {};
    const mockRequestId = 'request123';
    const mockSenderId = 'sender123';

    await denyMatchRequest(mockRequestId, mockSenderId, mockFirestore);

    // Check if doc was called with 'matchRequests' and requestId
    expect(doc).toHaveBeenCalledWith(
      mockFirestore,
      'matchRequests',
      mockRequestId,
    );

    // Check if updateDoc was called with expected arguments
    expect(updateDoc).toHaveBeenCalledWith('mockDocReference', {
      status: 'denied',
    });
  });
});

describe('Match functions - Error Scenarios', () => {
  beforeEach(() => {
    // Reset all mock function call counters before each test
    jest.clearAllMocks();
  });

  it('handles error when accepting a match request', async () => {
    const mockFirestore = {};
    const mockRequestId = 'request123';
    const mockSenderId = 'sender123';
    const mockCurrentUserId = 'user456';

    // Mock a rejection for addDoc
    addDoc.mockRejectedValue(new Error('Mock addDoc error'));

    // Spy on console.error
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await acceptMatch(
      mockRequestId,
      mockSenderId,
      mockFirestore,
      mockCurrentUserId,
    );

    // Check if error was logged
    expect(errorSpy).toHaveBeenCalledWith(
      'Error handling match approval: ',
      expect.any(Error),
    );

    errorSpy.mockRestore(); // Restore the original console.error function
  });

  it('handles error when denying a match request', async () => {
    const mockFirestore = {};
    const mockRequestId = 'request123';
    const mockSenderId = 'sender123';

    // Mock a rejection for updateDoc
    updateDoc.mockRejectedValue(new Error('Mock updateDoc error'));

    // Spy on console.log
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await denyMatchRequest(mockRequestId, mockSenderId, mockFirestore);

    // Check if error was logged
    expect(logSpy).toHaveBeenCalledWith(
      'Error handling match denial:',
      expect.any(Error),
    );

    logSpy.mockRestore();
  });
});
