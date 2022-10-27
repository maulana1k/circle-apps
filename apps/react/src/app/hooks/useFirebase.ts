import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCaCEXhyZWDwelEYccw1ivtyYgh6GncSoU",
  authDomain: "nx-app-bcf16.firebaseapp.com",
  projectId: "nx-app-bcf16",
  storageBucket: "nx-app-bcf16.appspot.com",
  messagingSenderId: "798082274912",
  appId: "1:798082274912:web:8e27ed9c48c441a1d15505",
  measurementId: "G-8K80J5WVTL"
};

// Initialize Firebase
// export const analytics = getAnalytics(app);


export const getAllFiles = async (url: string) => {
  initializeApp(firebaseConfig);
  const storage = getStorage();
  const files: string[] = [];
  const listRef = ref(storage, url);
  const res = await listAll(listRef);
  for (const item of res.items) {
    const url = await getDownloadURL(item);
    files.push(url);
  }
  return files;
};

export const uploadFiles = async (file: Blob, url: string) => {
  initializeApp(firebaseConfig);
  const storage = getStorage();
  const fileRef = ref(storage, url);
  const uploadTask = await uploadBytes(fileRef, file, {
    contentType: 'image/jpg',
  });
  const fileUrl = await getDownloadURL(uploadTask.ref);
  return fileUrl;
};
