import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBV6I2qJCn3u5P0Xxw2G9uZITBGlbCaYAM",
  authDomain: "recruit-website-d9181.firebaseapp.com",
  projectId: "recruit-website-d9181",
  storageBucket: "recruit-website-d9181.appspot.com",
  messagingSenderId: "55921259581",
  appId: "1:55921259581:web:54acece94c7a08dca42654",
  measurementId: "G-2RYR4HZZ7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore()