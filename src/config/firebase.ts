import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCvS1JCf5glFHnEmhn2bsJoKyqRXEJF7IQ",
  authDomain: "alerts-facae.firebaseapp.com",
  projectId: "alerts-facae",
  storageBucket: "alerts-facae.firebasestorage.app",
  messagingSenderId: "705247100684",
  appId: "1:705247100684:web:5014622f77344146a85329",
  measurementId: "G-5LQBGRVMW6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return {
      name: user.displayName || 'Participant User',
      email: user.email || '',
      avatar: user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      uid: user.uid
    };
  } catch (error: any) {
    console.error('Firebase Google Sign-In error:', error);
    throw error;
  }
};

export const logoutFirebase = async () => {
  await signOut(auth);
};
