import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const requiredKeys = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.appId,
];

const firebaseEnabled = requiredKeys.every((value) => !!value);

let app = null;
let auth = null;

if (firebaseEnabled) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);

  if (firebaseConfig.measurementId) {
    isSupported()
      .then((supported) => {
        if (supported) {
          getAnalytics(app);
        }
      })
      .catch(() => {
        // Analytics is optional; ignore support errors.
      });
  }
} else {
  console.warn(
    "Firebase config missing. Check VITE_FIREBASE_* variables in your env file."
  );
}

export { auth, firebaseEnabled };
