import {getStorage, ref, uploadBytes, getDownloadURL} from '@firebase/storage';
import firebaseApp from '../../firebaseConfig';

/**
 * Uploads an audio file to Firebase storage.
 *
 * @param {string} uri - The local URI of the audio file to be uploaded.
 * @returns {string} - The download URL of the uploaded audio file from Firebase storage.
 * @async
 */
export const uploadAudioToStorage = async uri => {
  //Initialize Firebase storage with the app configuration
  const storage = getStorage(firebaseApp);

  //Create a reference to the location in storage where the audio file will be saved
  const audioRef = ref(
    storage,
    `chats/audioMessages/${Math.random().toString()}.aac`,
  );

  // Convert the URI to Blob before uploading
  const response = await fetch(uri);
  const blob = await response.blob();

  //Upload the blob data to the defined storage reference
  const snapshot = await uploadBytes(audioRef, blob);

  //Once uploaded, retrieve the public download URL of the audio file from Firebase storage
  const downloadURL = await getDownloadURL(audioRef);

  return downloadURL;
};
