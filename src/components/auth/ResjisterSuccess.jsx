import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { CheckCircleTwoTone, RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const ResjisterSuccess = ({ type, message: popupMessage, duration = 2000, onClose, Scretkey }) => {

    // State for managing text to copy and export
    const [textToManage, setTextToManage] = useState(Scretkey);



    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4`}>
            <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
                <div className="flex justify-end p-2">
                    <button
                        onClick={onClose}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div className="p-6 pt-0 text-center">
                    {type === 'success' ? (
                        <div>
                            <CheckCircleTwoTone className='text-[4rem]' />
                            <h3 className="text-xl font-normal text-blue-500 mt-5 mb-6">{popupMessage}</h3>

                            <div className='flex gap-2 items-center'>
                                <p className='text-gray-500 text-sm '>Please click the login for login.</p>
                                <Link to='/login'

                                    className="text-gray-900 justify-end  bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                                >
                                    Login <RightCircleOutlined className='mx-2 text-blue-500' />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Oops! Please try again!</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResjisterSuccess;
