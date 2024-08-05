import { initializeApp } from "firebase/app";
import { getToken, getMessaging, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQDL0ITjXovTwscr0_o5gBJGy-Jgh8dMw",
    authDomain: "fcm-noti-1ec3e.firebaseapp.com",
    projectId: "fcm-noti-1ec3e",
    storageBucket: "fcm-noti-1ec3e.appspot.com",
    messagingSenderId: "259603580796",
    appId: "1:259603580796:web:9c42b0234679ce23f8c6f9",
    measurementId: "G-P2TBS90J0Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export { messaging };
// let fcmToken;


// export { fcmToken };