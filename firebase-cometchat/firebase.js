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
  where
  
} from 'firebase/firestore'
import { getStorage,deleteObject,ref } from 'firebase/storage';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBVSwzqvZznidybn2CduSP3m5FGYjaK4As",
  authDomain: "trueque2-4ab73.firebaseapp.com",
  projectId: "trueque2-4ab73",
  storageBucket: "trueque2-4ab73.appspot.com",
  messagingSenderId: "459337376166",
  appId: "1:459337376166:web:d95cdfb57a896cb00e2f67"
  //measurementId: "G-DQDHXM8N6R"
};
const provider = new GoogleAuthProvider();

export const app=initializeApp(firebaseConfig);
export const database=getFirestore(app);
export const storage=getStorage(app);
export const auth = getAuth(app);





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
  where,
  deleteObject,
  ref,
  

}