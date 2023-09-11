import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

//Local imports
import firebaseApp from '../../firebaseConfig';
export const uploadImage = async (uri, userId) => {
  const storage = getStorage(firebaseApp);
  const imageRef = ref(storage, `profileImages/${userId}`);

  const response = await fetch(uri);
  const blob = await response.blob();

  const uploadTask = uploadBytesResumable(imageRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      snapshot => {
        // progress function
      },
      error => {
        // Handle unsuccessful uploads
        reject(error);
      },
      () => {
        // Upload completed successfully
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          resolve(downloadURL);
        });
      },
    );
  });
};
