import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyDKPNIu_SVm29WGc55OwYIB9JLXDhdEIK0",
  authDomain: "socialnerwork-ac060.firebaseapp.com",
  projectId: "socialnerwork-ac060",
  storageBucket: "socialnerwork-ac060.appspot.com",
  messagingSenderId: "476922301021",
  appId: "1:476922301021:web:3bc2f090a178f236bf5bb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);