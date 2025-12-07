import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvxAHbRFcW6K5QC0UhOud5a_FNiK4nTDQ",
  authDomain: "react-assignment-3-d89d3.firebaseapp.com",
  projectId: "react-assignment-3-d89d3",
  storageBucket: "react-assignment-3-d89d3.firebasestorage.app",
  messagingSenderId: "160482100186",
  appId: "1:160482100186:web:6053b670769da59cea76e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
