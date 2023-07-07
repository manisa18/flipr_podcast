import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import env from "react-dotenv";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
