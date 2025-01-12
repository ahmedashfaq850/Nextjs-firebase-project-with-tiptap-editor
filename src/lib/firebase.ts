import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


/* const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}; */

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