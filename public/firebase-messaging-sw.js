// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAwxTT64vtG1TAbrJvFOhAI5TXS-5joHd0",
    authDomain: "fcm-notification-6eb8f.firebaseapp.com",
    projectId: "fcm-notification-6eb8f",
    storageBucket: "fcm-notification-6eb8f.appspot.com",
    messagingSenderId: "547280811969",
    appId: "1:547280811969:web:3d5fe3d8a9cdc44c08e140",
    measurementId: "G-EK0XK37V77"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
