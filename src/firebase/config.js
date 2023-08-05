// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAdx5KP1Pt-rT7WkQfK8MH-IOvyVa2o2DI',
  authDomain: 'yamyard-app.firebaseapp.com',
  projectId: 'yamyard-app',
  storageBucket: 'yamyard-app.appspot.com',
  messagingSenderId: '86525806429',
  appId: '1:86525806429:web:033dff254df6aa2a0acab4',
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Services
const projectDatabase = getFirestore();

export { projectDatabase };
