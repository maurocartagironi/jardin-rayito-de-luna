// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCQvFBY7RsiAgiUUZftwSKIgSDr3VrfNAM',
    authDomain: 'mi-rayito-de-luna.firebaseapp.com',
    projectId: 'mi-rayito-de-luna',
    storageBucket: 'mi-rayito-de-luna.firebasestorage.app',
    messagingSenderId: '48857501414',
    appId: '1:48857501414:web:47b540e870257fe861b527',
    measurementId: 'G-PTXCKSFH1X',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { analytics, db };
