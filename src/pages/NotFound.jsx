import React from 'react';
import { Button } from 'antd';
import { useNavigate} from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-500">404</h1>
      <p className="text-2xl text-gray-600">Page Not Found</p>
      <p className="mt-4 text-gray-500">Sorry, the page you visited does not exist.</p>
      <Button
        type="primary"
        icon={<LeftOutlined />}
        onClick={goBack}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white"
      >
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;
