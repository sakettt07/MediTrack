// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuPOlmQnJZQosLXCKgai5AtxDBTtaeK58",
  authDomain: "meditrack-4f28e.firebaseapp.com",
  projectId: "meditrack-4f28e",
  storageBucket: "meditrack-4f28e.firebasestorage.app",
  messagingSenderId: "619588223053",
  appId: "1:619588223053:web:e77d43acba559fbb939c04",
  measurementId: "G-Y8LY08HHHR"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});