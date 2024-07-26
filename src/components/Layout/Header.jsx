import React from "react";
import { Layout, Menu, notification, Button, Popover, List } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const { Header } = Layout;

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description: 'This is the content of the notification. This notification will close automatically after 4.5 seconds.',
    icon: <BellOutlined style={{ color: '#108ee9' }} />,
  });
};

const profileData = [
  { key: 'name', label: 'Name of User' },
  { key: 'update', label: 'Update Profile' },
  { key: 'password', label: 'Change Password' },
];

const ProfilePopover = () => (
  <List
    dataSource={profileData}
    renderItem={item => (
      <List.Item>
        <Link to={item.key === 'update' ? '/update-profile' : item.key === 'password' ? '/change-password' : '#'}>
          {item.label}
        </Link>
      </List.Item>
    )}
  />
);

const menuItems = [
  {
    label: (
      <div className="flex items-center gap-2">
        <img className="w-[50px] h-[50px] object-cover" src={logo} alt="Logo" />
        <h1 className="font-bold text-lg">BUDGET</h1>
      </div>
    ),
    key: 'logo',
  },
  {
    label: (
      <>
        <Button type="text" onClick={openNotification} className="mx-3">
          <BellOutlined style={{ fontSize: '20px' }} />
        </Button>
        <Popover content={<ProfilePopover />} title="Profile" trigger="click">
          <Button type="text">
            <UserOutlined style={{ fontSize: '24px' }} />
          </Button>
        </Popover>
      </>
    ),
    key: 'actions',
  },
];

const Headers = () => {
  return (
    <div className="top-0">
      <Header className="bg-white mt-5">
        <div className="header-col header-nav">
          <Menu mode="horizontal" className="justify-around" items={menuItems} />
        </div>
      </Header>
    </div>
  );
};

export default Headers;
