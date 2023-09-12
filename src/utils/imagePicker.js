import * as ImagePicker from 'expo-image-picker';
import {Alert} from 'react-native';

/**
 * An asynchronous function to let the user pick an image from their device's media library.
 *
 * @returns {string|undefined} The URI of the selected image or undefined if no image is picked or permissions are denied.
 */
export const pickImage = async () => {
  //Request permission to access to media library
  const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

  //Check if the permission is granted
  if (status !== 'granted') {
    Alert.alert('Sorry, we need camera roll permissions to make this work!');
    return;
  }

  //Launch the media library picker with specific options
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  // Check for cancellation using the new "canceled" property
  if (!result.canceled && result.assets && result.assets.length > 0) {
    // Access the URI from the assets array
    return result.assets[0].uri;
  }
};
