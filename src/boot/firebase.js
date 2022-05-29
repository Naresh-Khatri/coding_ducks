import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNxGSzXlVfHdUBodnNssbITxASlizlvXA",
  authDomain: "hackoverflow-3e2f0.firebaseapp.com",
  projectId: "hackoverflow-3e2f0",
  storageBucket: "hackoverflow-3e2f0.appspot.com",
  messagingSenderId: "770731497160",
  appId: "1:770731497160:web:be9b01628bca737be7f7fd",
  measurementId: "G-N7KM04BG24",
};

const app = initializeApp(firebaseConfig);

export const authServices = {
  getCurrentUser() {
    return new Promise((resolve) => {
      getAuth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          resolve({});
        }
      });
    });
  },
  logout() {
    return new Promise((resolve) => {
      getAuth()
        .signOut()
        .then(() => {
          resolve();
        });
    });
  },
};
