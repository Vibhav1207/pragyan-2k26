import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult, 
  signOut 
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCqusQj626txssYBtOnMhHXD2KfbSwgW98",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "pragyan-2k26.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "pragyan-2k26",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "pragyan-2k26.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "285180652671",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:285180652671:web:9a4d74edd712004c86a34a",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-Q97DFW6M2J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Force Google account selection
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const formatUserData = (user: any) => ({
  name: user.displayName || 'Participant User',
  email: user.email || '',
  avatar: user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  uid: user.uid
});

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return formatUserData(result.user);
  } catch (error: any) {
    console.error('Firebase Google Sign-In (Popup) error:', error);
    throw error;
  }
};

export const signInWithGoogleRedirect = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error: any) {
    console.error('Firebase Google Sign-In (Redirect) error:', error);
    throw error;
  }
};

export const checkRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      return formatUserData(result.user);
    }
    return null;
  } catch (error: any) {
    console.error('Firebase Check Redirect Result error:', error);
    throw error;
  }
};

export const logoutFirebase = async () => {
  await signOut(auth);
};

