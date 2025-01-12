import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB-hIlcIUwBqKW6ZxusUZK2kowx-khzChQ",
  authDomain: "text-editor-webapp.firebaseapp.com",
  projectId: "text-editor-webapp",
  storageBucket: "text-editor-webapp.firebasestorage.app",
  messagingSenderId: "723453587472",
  appId: "1:723453587472:web:7e5fb0f03660e9407b5a95",
  measurementId: "G-1WXQ5CBQZD"
};


// Check if any Firebase apps have been initialized
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);