// utils/imagePicker.js
import * as ImagePicker from 'expo-image-picker';
import {Alert} from 'react-native';

export const pickImage = async () => {
  const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Sorry, we need camera roll permissions to make this work!');
    return;
  }

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
