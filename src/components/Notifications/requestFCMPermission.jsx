import { initializeApp } from "firebase/app";
import { getToken, getMessaging, onMessage } from "firebase/messaging";
import { supabase } from '../../services/supabaseClient'

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
// export { messaging };
// let fcmToken;


// export { fcmToken };

const requestFCMPermission = async (userId) => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {

            if ('serviceWorker' in navigator) {
                navigator.serviceWorker
                    .register('/firebase-messaging-sw.js')
                    .then((registration) => {
                        console.log('Service Worker registered with scope:', registration.scope);

                        // Initialize Firebase Cloud Messaging

                        // Add the public VAPID key and service worker registration
                        console.log({ pcmkey: process.env.FCM_PUBLIC_KEY })
                        getToken(messaging, { vapidKey: process.env.FCM_PUBLIC_KEY, serviceWorkerRegistration: registration })
                            .then(async (currentToken) => {
                                if (currentToken) {
                                    console.log('FCM Token:', currentToken);

                                    const addFCMToken = await supabase.from('user_profile').update({ fcm_token: currentToken }).eq('user_id', userId).select().single();

                                    console.log('FCM Token added:', addFCMToken);
                                    return
                                } else {
                                    console.log('No registration token available. Request permission to generate one.');
                                }
                            })
                            .catch((err) => {
                                console.log('An error occurred while retrieving token. ', err);
                            });

                        // Listen for messages when the app is in the foreground
                        onMessage(messaging, (payload) => {
                            console.log('Message received. ', payload);
                            // Handle the message payload here
                        });

                    })
                    .catch((err) => {
                        console.error('Service Worker registration failed: ', err);
                    });
            } else {
                console.warn('Service workers are not supported by this browser.');
            }
        } else {
            console.error('Notification permission denied.');
            return null;
        }
    } catch (error) {
        console.error('An error occurred while requesting permission for notifications:', error);
        return null;
    }
};

export default requestFCMPermission;



// const token = await getToken(messaging, { vapidKey: 'BLRbUPadHl1oWTzG7eczETCy_GB647T648KEZpvSnKH4WO0h88yh78j4UlyWOf7eA6jYSrfa_Yjcfc7PJQsfSh0' });
