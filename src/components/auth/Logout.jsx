// // Logout.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../services/supabaseClient';
// import { Button, notification } from 'antd';

// const Logout = () => {
//     const navigate = useNavigate();

//     const handleLogout = async () => {
//         const { error } = await supabase.auth.signOut();

//         if (error) {
//             notification.error({
//                 message: 'Logout Failed',
//                 description: error.message,
//             });
//         } else {
//             notification.success({
//                 message: 'Logout Successful',
//                 description: 'You have been logged out successfully.',
//             });
//             navigate('/login'); // Redirect to login page
//         }
//     };

//     return (
//         <Button type="primary" onClick={handleLogout}>
//             Logout
//         </Button>
//     );
// };

// export default Logout;
