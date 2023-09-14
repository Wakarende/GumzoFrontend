import {uploadImage} from '../uploadImage';
// import {mockUploadBytesResumable, mockGetDownloadURL} from 'firebase/storage';
import firebaseApp from '../../../firebaseConfig';

jest.mock('../../../firebaseConfig.js', () => ({
  default: jest.fn(),
}));
jest.mock('firebase/storage');

const mockUploadBytesResumable = jest.fn(() => ({
  on: (state, progress, error, success) => {
    if (state === 'state_changed') {
      const snapshot = {ref: {}};
      success(snapshot);
    }
  },
}));

// Rest of your code...

const mockGetDownloadURL = jest.fn();

const mock = {
  getStorage: jest.fn(() => ({})),
  ref: jest.fn(),
  uploadBytesResumable: mockUploadBytesResumable,
  getDownloadURL: mockGetDownloadURL,
};

// Mocking the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    blob: () => Promise.resolve('blob_data'),
  }),
);

describe('uploadImage', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods
    jest.clearAllMocks();
  });

  it('successfully uploads an image and returns its download URL', async () => {
    const sampleURI = 'http://example.com/sample.jpg';
    const sampleUserId = '123456';
    const sampleDownloadURL = 'http://firebase.com/sample.jpg';

    // Mock Firebase functions
    mockUploadBytesResumable.mockReturnValueOnce({
      on: (state, progress, error, success) => {
        const snapshot = {ref: {}};
        success(snapshot);
      },
    });
    mockGetDownloadURL.mockResolvedValueOnce(sampleDownloadURL);

    const result = await uploadImage(sampleURI, sampleUserId);
    expect(result).toEqual(sampleDownloadURL);
  });

  it('throws error when upload fails', async () => {
    const sampleURI = 'http://example.com/sample.jpg';
    const sampleUserId = '123456';

    mockUploadBytesResumable.mockReturnValueOnce({
      on: (state, progress, error, success) => {
        error(new Error('Upload error'));
      },
    });

    await expect(uploadImage(sampleURI, sampleUserId)).rejects.toThrow(
      'Upload error',
    );
  });
});
