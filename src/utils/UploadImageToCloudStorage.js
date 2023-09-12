import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

//local imports
import firebaseApp from '../../firebaseConfig';
/**
 * Uploads an image to Firebase Cloud Storage.
 *
 * @param {string} uri - The local URI of the image to be uploaded.
 * @return {Promise<string>} - A promise that resolves with the download URL of the uploaded image.
 */
export async function uploadImageToCloudStorage(uri) {
  //Convert the image URL to a blob for upload
  const response = await fetch(uri);
  const blob = await response.blob();

  //Initialize Firebase Storage and set a unique storage reference path for the image
  const storage = getStorage(firebaseApp);
  const storageRef = ref(
    storage,
    'user_images/' + new Date().getTime() + '.jpg',
  );

  const uploadTask = uploadBytesResumable(storageRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      snapshot => {
        //calculate the log and upload progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      error => {
        // Handle unsuccessful uploads
        reject(error);
      },
      async () => {
        //Once uploaded, retrieve and return the donwload URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      },
    );
  });
}
