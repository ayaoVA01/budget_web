// import React, { useEffect, useState } from "react";
// import { supabase } from "../../services/supabaseClient"; // Adjust the path as needed

// const BrowserNotification = () => {
//     const [notifications, setNotifications] = useState([]);
//     const [hasNotification, setHasNotification] = useState(false);

//     // Handle browser notifications status
//     const handleNotificationClick = () => {
//         setHasNotification(false);
//         // Implement logic to mark notifications as read, if needed
//     };

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             try {
//                 // Fetch session data
//                 const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
//                 if (sessionError) {
//                     throw new Error('Error fetching session:', sessionError);
//                 }

//                 const userId = sessionData.session.user.id;

//                 // Fetch initial notifications
//                 const { data: initialNotifications, error: fetchError } = await supabase
//                     .from('notification')
//                     .select(`
//                         *,
//                         budget:budget(id, budget_name, owner),
//                         user_profile(*)
//                     `)
//                     .eq('budget.owner', userId)
//                     .eq('noti_type', 'ACCEPT_JOIN_ROOM')
//                     .not('sender', 'eq', userId);

//                 if (fetchError) {
//                     throw new Error('Error fetching notifications:', fetchError);
//                 }

//                 setNotifications(initialNotifications);

//                 // Set up real-time listener for new notifications
//                 const notificationListener = supabase
//                     .channel('public:notification')
//                     .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notification' }, payload => {
//                         setNotifications(prevNotifications => [...prevNotifications, payload.new]);
//                         setHasNotification(true);

//                         // Browser Notification
//                         new Notification("Notification", {
//                             body: payload.new.text, // Adjust based on your notification structure
//                             icon: "https://via.placeholder.com/150" // Optional: Add an icon to the notification
//                         });
//                     })
//                     .subscribe();

//                 return () => {
//                     supabase.removeChannel(notificationListener);
//                 };
//             } catch (error) {
//                 console.error('Error:', error.message);
//             }
//         };

//         fetchNotifications();
//     }, []);

//     return (
//         <div>
//             {/* Render your notification UI here */}
//             <ul>
//                 {notifications.map((notification, index) => (
//                     <li key={index}>
//                         {notification.text} {/* Adjust based on your notification structure */}
//                     </li>
//                 ))}
//             </ul>
//             {hasNotification && (
//                 <button onClick={handleNotificationClick}>
//                     Check Notifications
//                 </button>
//             )}
//         </div>
//     );
// };

// export default BrowserNotification;
