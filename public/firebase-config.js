// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKL7ggXecLMJHFbC6EVzHm_51UurrGZI8",
  authDomain: "fadiabkry-8fae6.firebaseapp.com",
  projectId: "fadiabkry-8fae6",
  storageBucket: "fadiabkry-8fae6.firebasestorage.app",
  messagingSenderId: "841223954639",
  appId: "1:841223954639:web:1e5270f6ae7cf0004417ba",
  measurementId: "G-8P8TG56J17"
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
