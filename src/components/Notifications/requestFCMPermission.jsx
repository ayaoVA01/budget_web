// src/requestFCMPermission.jsx
import { messaging } from './firebase.jsx';
import { getToken } from 'firebase/messaging';

const requestFCMPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            const vapidKey = 'jmkcWb2wm0D4iBP_D2nPhv18WAyksysWrXbsjzAEO80';
            const token = await getToken(messaging, { vapidKey });

            console.log('FCM Token:', token);
            return token;
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
