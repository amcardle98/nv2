import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCh62Bd4KZSWGLd5E6s9pdfFVH9JPUOMjk",
    authDomain: "envelope-ui.firebaseapp.com",
    projectId: "envelope-ui",
    storageBucket: "envelope-ui.firebasestorage.app",
    messagingSenderId: "181356686676",
    appId: "1:181356686676:web:107d363e97323f2c91acc1",
  },
};

export const FIREBASE_APP = initializeApp(config.firebase);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
