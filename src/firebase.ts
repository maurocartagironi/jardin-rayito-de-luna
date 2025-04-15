// firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, logEvent as firebaseLogEvent } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: 'AIzaSyCQvFBY7RsiAgiUUZftwSKIgSDr3VrfNAM',
    authDomain: 'mi-rayito-de-luna.firebaseapp.com',
    projectId: 'mi-rayito-de-luna',
    storageBucket: 'mi-rayito-de-luna.appspot.com',
    messagingSenderId: '48857501414',
    appId: '1:48857501414:web:47b540e870257fe861b527',
    measurementId: 'G-PTXCKSFH1X',
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Solo obtené analytics si está en navegador
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

// Envoltorio seguro para logEvent
const logEvent = (
    analyticsInstance: typeof analytics,
    eventName: string,
    params?: any
) => {
    if (analyticsInstance) {
        firebaseLogEvent(analyticsInstance, eventName, params);
    }
};

export { app, db, analytics, logEvent };
