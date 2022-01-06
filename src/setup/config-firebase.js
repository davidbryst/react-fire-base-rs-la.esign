import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBfDfzCjNyo7IdM9JVCyDwPts6XqAXZ8kQ",
  authDomain: "laesign-1680f.firebaseapp.com",
  projectId: "laesign-1680f",
  storageBucket: "laesign-1680f.appspot.com",
  messagingSenderId: "485986692134",
  appId: "1:485986692134:web:c2540a67a768d06d938ae7",
  measurementId: "G-6EYLXJDEFJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);