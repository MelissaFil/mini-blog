import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5ofdlVAOfKGMpHur6irJVCUuiQ9Wbeeg",
  authDomain: "mini-blog-53bf4.firebaseapp.com",
  projectId: "mini-blog-53bf4",
  storageBucket: "mini-blog-53bf4.appspot.com",
  messagingSenderId: "284371368857",
  appId: "1:284371368857:web:7300c51679db5af591f108"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};