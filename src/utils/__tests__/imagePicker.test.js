import * as ImagePicker from 'expo-image-picker';
import {Alert} from 'react-native';
import {pickImage} from '../imagePicker'; // Adjust the path accordingly

// Mock modules
jest.mock('expo-image-picker', () => ({
  MediaTypeOptions: {
    All: 'All',
    // You can add other options here if needed like Images, Videos, etc.
  },
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('pickImage function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('alerts the user if permission is not granted', async () => {
    ImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValue({
      status: 'denied',
    });

    await pickImage();

    expect(Alert.alert).toHaveBeenCalledWith(
      'Sorry, we need camera roll permissions to make this work!',
    );
  });

  it('returns the image URI if an image is selected', async () => {
    ImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValue({
      status: 'granted',
    });
    ImagePicker.launchImageLibraryAsync.mockResolvedValue({
      canceled: false,
      assets: [{uri: 'sampleURI'}],
    });

    const result = await pickImage();

    expect(result).toBe('sampleURI');
  });

  it('returns nothing if the operation is canceled', async () => {
    ImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValue({
      status: 'granted',
    });
    ImagePicker.launchImageLibraryAsync.mockResolvedValue({
      canceled: true,
      assets: [],
    });

    const result = await pickImage();

    expect(result).toBeUndefined();
  });
});
