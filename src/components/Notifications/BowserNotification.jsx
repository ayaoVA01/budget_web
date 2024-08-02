import React from "react";

const BrowserNotification = ({ title, descript, image, }) => {

    const browserNotifications = () => {
        // Request permission from the user
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                // Create a new notification
                new Notification(title, {
                    body: descript,
                    icon: image  // Optional: Add an icon to the notification
                    // icon: "https://via.placeholder.com/150" // Optional: Add an icon to the notification
                });
            } else {
                console.error('Notification permission denied.');
            }
        }).catch(error => {
            console.error('Error requesting notification permission:', error);
        });
    }

    return (
        <div>
            {/* Corrected onClick handler: pass the function reference, not the function call */}
            <button onClick={browserNotifications}>Show Notification</button>
        </div>
    );
}

export default BrowserNotification;
