import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient'; // Adjust the path as needed
import { Layout, notification, Button, Popover, List, Badge } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
// import BrowserNotification from '../Notifications/BowserNotification';
const { Header } = Layout;

const Headers = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [hasNotification, setHasNotification] = useState(false); // State to handle notification status
  const [userData, setUserData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  const fetchUserData = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error fetching session:', error);
    }

    const { data: userData, error: userDataError } = await supabase.from('user_profile')
      .select()
      .eq('user_id', data.session.user.id)
      .single();
    if (userDataError) {
      console.error('Error fetching User data:', userDataError);
    }
    setUserId(data.session.user.id)

    setUserData(userData.full_name);
    console.log({ data });

    console.log({ userData });
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      notification.error({
        message: 'Logout Failed',
        description: error.message,
      });
    } else {
      notification.success({
        message: 'Logout Successful',
        description: 'You have been logged out successfully.',
      });
      navigate('/'); // Redirect to login page
    }
  };

  const profileData = [
    { key: 'name', label: `Hi 🖐! ${userData}` },
    { key: 'update', label: 'Update Profile' },
    { key: 'password', label: 'Change Password' },
    { key: 'logout', label: 'Logout' }, // Add Logout option
  ];

  const ProfilePopover = () => (
    <List
      dataSource={profileData}
      renderItem={item => (
        <List.Item>
          <Link
            to={item.key === 'update' ? '/update-profile' : item.key === 'password' ? '/change-password' : '#'}
            onClick={item.key === 'logout' ? handleLogout : undefined}
            style={item.key === 'logout' ? { color: 'red' } : {}}
          >
            {item.label}
          </Link>
        </List.Item>
      )}
    />
  );

  const handleNotificationClick = () => {
    setHasNotification(false);
    // Implement logic to mark notifications as read
  };



  useEffect(() => {
    fetchUserData();


    // const fetchNotifications = async () => {

    //   // const { data: initialNotifications, error: fetchError } = await supabase
    //   //   .from('notification')
    //   //   .select(`
    //   //     *,
    //   //     budget:budget(id, budget_name, owner),
    //   //     user_profile(*)
    //   // `)
    //   //   .eq('budget.owner', userId)
    //   //   .eq('noti_type', 'ACCEPT_JOIN_ROOM')
    //   // // .not('sender', 'eq', userId)// Order by created_at descending
    //   // // .limit(1);

    //   // if (fetchError) {
    //   //   throw new Error('Error fetching notifications:', fetchError);
    //   // }
    //   // const latestNotification = initialNotifications.length > 0 ? initialNotifications[0] : null;

    //   console.log('Fetching notifications', latestNotification)


    // }
    // fetchNotifications();
    const notificationListener = supabase
      .channel('public:notification')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notification' }, payload => {
        setNotifications(prevNotifications => [...prevNotifications, payload.new]);
        setHasNotification(true);

        // Browser Notification
        new Notification("Notification", {
          body: "text notification",
          icon: "https://via.placeholder.com/150" // Optional: Add an icon to the notification
        });
      })
      .subscribe();
    console.log({ notificationListener })
    return () => {
      supabase.removeChannel(notificationListener);


    };

  }, []);

  return (
    <div className="top-0">
      <Header className="bg-white mt-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img className="w-[50px] h-[50px] object-cover" src={logo} alt="Logo" />
            <h1 className="font-bold text-lg">BUDGET</h1>
          </div>
          <div>
            <Badge dot={hasNotification} offset={[-10, 10]}>
              <Link to='/notification'>


                <Button type="text" className="mx-3" onClick={handleNotificationClick}>
                  <BellOutlined style={{ fontSize: '20px' }} />
                </Button>
              </Link>
            </Badge>
            <Popover content={<ProfilePopover />} title="Profile" trigger="click">
              <Button type="text">
                <UserOutlined style={{ fontSize: '24px' }} />
              </Button>
            </Popover>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default Headers;
