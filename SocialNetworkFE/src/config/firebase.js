import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage"
const firebaseConfig = {
  // apiKey: "AIzaSyDKPNIu_SVm29WGc55OwYIB9JLXDhdEIK0",
  // authDomain: "socialnerwork-ac060.firebaseapp.com",
  // projectId: "socialnerwork-ac060",
  // storageBucket: "socialnerwork-ac060.appspot.com",
  // messagingSenderId: "476922301021",
  // appId: "1:476922301021:web:3bc2f090a178f236bf5bb4"
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