import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className="w-full text-gray-500 py-6 -bottom-5 absolute">
      <div className="container mx-auto text-center">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold">BUDGET</h2>
            <p>Manage your finances efficiently</p>
          </div>
          <div className="flex space-x-6">
            <a href="/home" className="text-blue-500 hover:text-blue-400">Home</a>
            <a href="/create" className="text-blue-500 hover:text-blue-400">Create Budget</a>
            <a href="/join" className="text-blue-500 hover:text-blue-400">Join Budget</a>
            <a href="/update-profile" className="text-blue-500 hover:text-blue-400">Update Profile</a>
            <a href="/change-password" className="text-blue-500 hover:text-blue-400">Change Password</a>
          </div>
        </div>
        <div className="mt-4 text-gray-400">
          <p>&copy; {new Date().getFullYear()} Budget. All rights reserved.</p>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
