import { initializeApp, getApps } from 'firebase/app'

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  collectionGroup,
  arrayUnion,
  arrayRemove,
  updateDoc,
  
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAVsFDHo1vfLMtmFfM_BXgvrhE8oTylxOA",
  authDomain: "chat-trueque-01.firebaseapp.com",
  projectId: "chat-trueque-01",
  storageBucket: "chat-trueque-01.appspot.com",
  messagingSenderId: "773737046110",
  appId: "1:773737046110:web:b3d6781554b0d1f2f8d4cf",
  measurementId: "G-DQDHXM8N6R"
};
const provider = new GoogleAuthProvider();

const app=initializeApp(firebaseConfig);
export const database=getFirestore(app);
export const storage=getStorage(app);





if (!getApps().length) initializeApp(firebaseConfig)

export {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  provider,
  updateProfile,
  signOut,
  collection,
  collectionGroup,
  addDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  getDoc,
  getDocs,
  setDoc,
  doc,
  arrayUnion,
  arrayRemove,
  updateDoc,

}