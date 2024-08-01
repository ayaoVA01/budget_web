import React, { useState } from "react";
import { Layout, notification, Button, Popover, List, Badge } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabaseClient"; // Adjust path as needed

const { Header } = Layout;

const Headers = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [hasNotification, setHasNotification] = useState(true); // State to handle notification status

  const openNotification = () => {
    notification.open({
      message: 'Notification Title',
      description: 'This is the content of the notification. This notification will close automatically after 4.5 seconds.',
      icon: <BellOutlined style={{ color: '#108ee9' }} />,
    });
    setHasNotification(false); // Reset notification status after opening
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
    { key: 'name', label: 'Name of User' },
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
                <Button type="text" className="mx-3">
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
