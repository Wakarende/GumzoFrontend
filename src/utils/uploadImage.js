import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

//Local imports
import firebaseApp from '../../firebaseConfig';

/**
 * Uploads a user's profile image to Firebase Storage.
 *
 *
 * @param {string} uri - The local URI of the image to be uploaded.
 * @param {string} userId - The unique ID of the user, used to determine the storage path.
 * @return {Promise<string>} - Resolves with the download URL of the uploaded image.
 */
export const uploadImage = async (uri, userId) => {
  const storage = getStorage(firebaseApp);
  const imageRef = ref(storage, `profileImages/${userId}`);

  //Convert the image URI to a blob for upload
  const response = await fetch(uri);
  const blob = await response.blob();

  //Start the resumable upload task
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
