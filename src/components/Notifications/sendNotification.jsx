// src/sendNotification.js
import axios from 'axios';

const sendFCMNotification = async (token, title, body) => {
    const serverKey = 'YOUR_SERVER_KEY';
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `key=${serverKey}`,
    };

    const data = {
        to: token,
        notification: {
            title: title,
            body: body,
        },
    };

    try {
        const response = await axios.post('https://fcm.googleapis.com/fcm/send', data, { headers });
        console.log('Notification sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

export default sendFCMNotification;
