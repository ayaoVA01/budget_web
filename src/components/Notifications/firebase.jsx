// src/firebase.jsx
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAwxTT64vtG1TAbrJvFOhAI5TXS-5joHd0",
    authDomain: "fcm-notification-6eb8f.firebaseapp.com",
    projectId: "fcm-notification-6eb8f",
    storageBucket: "fcm-notification-6eb8f.appspot.com",
    messagingSenderId: "547280811969",
    appId: "1:547280811969:web:3d5fe3d8a9cdc44c08e140",
    measurementId: "G-EK0XK37V77"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
if (messaging) {
    console.log("initial firebase successful!", messaging)
}

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/firebase-messaging-sw.js')
//         .then((registration) => {
//             console.log('Service Worker registered with scope:', registration.scope);
//         }).catch((err) => {
//             console.log('Service Worker registration failed:', err);
//         });
// }

export { messaging };
