import React, { useState } from 'react';
import { List, Avatar, Button, Skeleton, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import { LeftCircleTwoTone } from '@ant-design/icons';

// Sample notifications data
const notifications = [
  {
    id: 1,
    type: 'join',
    message: 'John Doe wants to join your budget room.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    approved: false,
  },
  {
    id: 2,
    type: 'note',
    message: 'Jane Smith posted a new note.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  // Add more notifications here...
];

const NotificationPage = () => {
  const history = useHistory();
  const [notificationList, setNotificationList] = useState(notifications);

  const handleBack = () => {
    history.goBack();
  };

  const handleApprove = (id) => {
    // Approve member logic here
    const updatedNotifications = notificationList.map((notification) =>
      notification.id === id ? { ...notification, approved: true } : notification
    );
    setNotificationList(updatedNotifications);

    notification.success({
      message: 'Member Approved',
      description: 'The member has been approved to join the budget room.',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={handleBack} icon={<LeftCircleTwoTone />} />
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={notificationList}
          renderItem={(item) => (
            <List.Item
              actions={
                item.type === 'join' && !item.approved
                  ? [
                      <Button
                        type="primary"
                        onClick={() => handleApprove(item.id)}
                      >
                        Approve
                      </Button>,
                    ]
                  : null
              }
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={item.type === 'join' ? 'Join Request' : 'New Note'}
                  description={item.message}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default NotificationPage;
