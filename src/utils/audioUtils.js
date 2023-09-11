import {getStorage, ref, uploadBytes, getDownloadURL} from '@firebase/storage';
import firebaseApp from '../../firebaseConfig';
export const uploadAudioToStorage = async uri => {
  const storage = getStorage(firebaseApp);
  const audioRef = ref(
    storage,
    `chats/audioMessages/${Math.random().toString()}.aac`,
  );

  // Convert the URI to Blob before uploading
  const response = await fetch(uri);
  const blob = await response.blob();

  const snapshot = await uploadBytes(audioRef, blob);
  const downloadURL = await getDownloadURL(audioRef);

  return downloadURL;
};
