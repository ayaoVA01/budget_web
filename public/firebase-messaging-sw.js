importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQDL0ITjXovTwscr0_o5gBJGy-Jgh8dMw",
    authDomain: "fcm-noti-1ec3e.firebaseapp.com",
    projectId: "fcm-noti-1ec3e",
    storageBucket: "fcm-noti-1ec3e.appspot.com",
    messagingSenderId: "259603580796",
    appId: "1:259603580796:web:9c42b0234679ce23f8c6f9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        // icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
