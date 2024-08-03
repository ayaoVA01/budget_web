import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { CheckCircleTwoTone, RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import { decodeKey } from '../../utils/BudgetRoomSecrete';
import { CloseOutlined } from '@ant-design/icons';

const Popup = ({ type, message: popupMessage, onClose, Scretkey }) => {
    const [close, setClose] = useState(false);
    const [textToManage, setTextToManage] = useState(Scretkey);
    const navigate = useNavigate();
    const handleCopy = () => {
        navigator.clipboard.writeText(textToManage).then(() => {
            message.success('Text copied to clipboard!');
        }).catch(err => {
            message.error('Failed to copy text');
        });
    };

    const roomId = decodeKey(Scretkey);

    const handleExport = () => {
        const blob = new Blob([textToManage], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'exported-text.txt';
        a.click();
        window.URL.revokeObjectURL(url);
        message.success('Text exported to file!');
        // navigate(`/room/${roomId}`)
        setClose(true)
        navigate(window.open(`http://localhost:5173/room/${roomId}`, '_blank'));


    };

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         onClose();
    //     }, duration);

    //     return () => clearTimeout(timer);
    // }, [duration, onClose]);

    return (
        <div className={`fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4`}>
            <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
                <div className="flex justify-end p-2">

                    {close ? (


                        <button
                            onClick={onClose}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        >
                            <CloseOutlined />

                        </button>
                    ) : null}
                </div>
                <div className="p-6 pt-0 text-center">
                    {type === 'success' ? (
                        <div>
                            <CheckCircleTwoTone className='text-[4rem]' />
                            <h3 className="text-xl font-normal text-blue-500 mt-5 mb-6">{popupMessage}</h3>
                            {Scretkey && (
                                <div>
                                    <div>
                                        <p className='text-sm text-start text-gray-500'>Please export your Budget room secret key and don't share it with others.</p>
                                        <div className='flex items-center justify-center'>
                                            <h3 className="text-xl overflow-hidden font-normal text-gray-500 mb-6 p-4 border-b rounded-lg">{Scretkey}</h3>
                                            <div>
                                                <Button type="default" onClick={handleCopy} style={{ marginRight: '10px' }} className='m-3'>
                                                    Copy
                                                </Button>
                                            </div>
                                        </div>
                                        <Button type="primary" onClick={handleExport}>
                                            Export
                                        </Button>
                                    </div>
                                </div>
                            )}
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

export default Popup;
