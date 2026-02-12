import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAprYnibAVkfbEd3Ih4PoW952yzX76ufho",
  authDomain: "arc-robotics-805ca.firebaseapp.com",
  databaseURL: "https://arc-robotics-805ca-default-rtdb.firebaseio.com",
  projectId: "arc-robotics-805ca",
  storageBucket: "arc-robotics-805ca.appspot.com",
  messagingSenderId: "890763237760",
  appId: "1:890763237760:web:07774b844d1924366f4965",
};

const app = initializeApp(firebaseConfig);

// ✅ THIS WAS MISSING
export const database = getDatabase(app);
