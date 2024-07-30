import React from 'react';
import { Button } from 'antd';
import { LeftCircleTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const PendingApproval = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="container mx-auto mt-10">
      <Button onClick={handleBack} className="flex gap-2 items-center text-gray-500 mb-5">
        <LeftCircleTwoTone /> Back
      </Button>
      <h1 className="text-2xl font-bold mb-5">Pending Approvals</h1>
      <div className="text-center mt-20">
        <p className="text-lg text-blue-500">There are items pending for approval.</p>
      </div>
    </div>
  );
};

export default PendingApproval;
