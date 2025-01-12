'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  deleteUser,
  UserCredential,
  User as FirebaseUser 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getFirestore, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Initialize Firestore
const db = getFirestore();

interface User {
  id: string;
  email: string;
  isLoggedIn: boolean;
  displayName?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  signup: (email: string, password: string, displayName: string, bio: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  updateUserProfile: (displayName: string, bio: string) => Promise<void>;
  deleteUserAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signup: () => Promise.resolve({} as UserCredential),
  login: () => Promise.resolve({} as UserCredential),
  logout: () => Promise.resolve(),
  updateUserProfile: () => Promise.resolve(),
  deleteUserAccount: () => Promise.resolve(),
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string, displayName: string, bio: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const userId = result.user.uid;

    // Save user data to Firestore
    await setDoc(doc(db, 'users', userId), {
      id: userId,
      email,
      displayName,
      bio,
    });

    setUser({
      id: userId,
      email,
      isLoggedIn: true,
      displayName,
      bio,
    });

    return result;
  };

  const login = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const updateUserProfile = async (displayName: string, bio: string) => {
    if (!user) return;

    const userId = user.id;

    await updateDoc(doc(db, 'users', userId), { displayName, bio });

    setUser((prev) => (prev ? { ...prev, displayName, bio } : null));
  };

  const deleteUserAccount = async () => {
    if (!auth.currentUser) throw new Error('No user is logged in.');

    try {
      const userId = auth.currentUser.uid;

      // Delete user data from Firestore
      await deleteDoc(doc(db, 'users', userId));

      // Delete user from Firebase Authentication
      await deleteUser(auth.currentUser);

      // Clear user state
      setUser(null);
    } catch (error) {
      console.error('Error deleting user account:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          isLoggedIn: true,
          displayName: firebaseUser.displayName || undefined,
          bio: undefined,
        };
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    signup,
    login,
    logout,
    updateUserProfile,
    deleteUserAccount,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
