import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyACbmQJf5VdeOp66pP7NXIR4tUiXxNHjyQ",
  authDomain: "podcast-f4c97.firebaseapp.com",
  projectId: "podcast-f4c97",
  storageBucket: "podcast-f4c97.appspot.com",
  messagingSenderId: "602876704726",
  appId: "1:602876704726:web:6966dc61535ec189849677",
  measurementId: "G-08JN2FN4CD",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
