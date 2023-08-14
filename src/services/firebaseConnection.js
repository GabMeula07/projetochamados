import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCTKEWm0Nst-rr0IjVApzCboWTpvlPRpRc",
  authDomain: "projeto-chamados-f2fef.firebaseapp.com",
  projectId: "projeto-chamados-f2fef",
  storageBucket: "projeto-chamados-f2fef.appspot.com",
  messagingSenderId: "113726273346",
  appId: "1:113726273346:web:09300d8ed1d806e67c3adb",
  measurementId: "G-N9G5KQLZK5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
