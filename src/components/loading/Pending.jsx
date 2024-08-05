import React from 'react';
import { Button } from 'antd';
import { LeftCircleTwoTone } from '@ant-design/icons';

const PendingApproval = () => {


  return (
    <div className="container mx-auto mt-10">
      {/* <Button onClick={handleBack} className="flex gap-2 items-center text-gray-500 mb-5">
        <LeftCircleTwoTone /> Back
      </Button> */}
      <h1 className="text-2xl font-bold mb-2">Pending Approvals</h1>
      <div className="text-center mt-10  space-y-4 sm:p-8 rounded-lg border border-b-0 border-r-0 border-l-0 border-gray-200">
        <p className="text-lg text-blue-500">There are items pending for approval.</p>
      </div>
    </div>
  );
};

export default PendingApproval;
