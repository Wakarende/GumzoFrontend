import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

//local imports
import firebaseApp from '../../firebaseConfig';

export async function uploadImageToCloudStorage(uri) {
  const response = await fetch(uri);
  const blob = await response.blob();

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
        //upon successful upload
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      error => {
        // Handle unsuccessful uploads
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      },
    );
  });
}
