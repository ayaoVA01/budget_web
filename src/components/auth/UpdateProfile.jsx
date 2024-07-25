import React, { useState } from 'react';
import Headers from '../Layout/Header';
import { Link } from "react-router-dom";
import Popup from '../popup/Popup';
import { Button, Form, Input, Upload } from "antd";
import { LeftCircleTwoTone, UploadOutlined } from "@ant-design/icons";
import avatar from "../../assets/images/stickman.webp"
import logo from '../../assets/images/logo.png';

const UpdateProfile = () => {
    const [success, setSucces] = useState(true);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(logo); // Initial image URL
    const [imageName, setImageName] = useState('');
    const handleReset = () => {
        form.resetFields();
        setImageUrl(avatar); // Reset to initial image URL
        setImageName(''); // Reset image name
    };
    const handlePopupClose = () => {
        setSucces(false);
    };
    const triggerPopup = () => {
        setSucces(true);
    };

    const handleImageChange = info => {
        const file = info.file.originFileObj;
        const reader = new FileReader();

        reader.onload = () => {
            setImageUrl(reader.result);
            setImageName(file.name); // Set the image name
        };

        reader.readAsDataURL(file);
    };

    const initialValues = {
        fullname: 'John Doe',
        phone: '1234567890',
        email: 'john.doe@example.com',
    };

    return (
        <div>
            <Headers />
            <div>
                <div className="w-full mx-auto sm:max-w-[70rem] md:mt-0 xl:p-0">
                    <div className="p-6 w-full bg-white mb-[4rem] space-y-4 sm:p-8 rounded-lg border border-b-0 border-r-0 border-l-0 border-gray-200">
                        <Link to='/home' className='flex gap-2 text-gray-500'>
                            <LeftCircleTwoTone />
                            back
                        </Link>
                        <div className='lg:flex sm-max:flex-col gap-2 justify-center'>
                            
                            {success && (
                                <Popup
                                    type="success"
                                    message="Operation completed successfully!"
                                    duration={2000}
                                    onClose={handlePopupClose}
                                    
                                />
                            )}

                            <div className='w-full '>
                                <h1 className="text-xl pt-2 text-start font-bold leading-tight tracking-tight md:text-2xl">
                                    Update Profile
                                </h1>
                                <p className='text-sm text-gray-400 mt-2 mb-5'>Find and update your details</p>
                            </div>
                            <Form
                                form={form}
                                initialValues={initialValues}
                                layout="vertical"
                                className="row-col w-full"
                            >
                                <Form.Item
                                    className="text-gray-400"
                                    label={<span className="text-gray-400">Profile Image</span>}
                                    name="image"
                                    valuePropName="fileList"
                                    getValueFromEvent={e => e.fileList}
                                >
                                    <Upload
                                        name="profileImage"
                                        listType="picture"
                                        showUploadList={true}
                                        beforeUpload={() => true}
                                        onChange={handleImageChange}
                                    >
                                        <Button icon={<UploadOutlined />}>Upload</Button>
                                    </Upload>
                                    {/* <div className="mt-2">
                                        <img src={imageUrl} alt="Profile" className="border rounded" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                                    </div> */}

                                </Form.Item>
                                <Form.Item
                                    className="text-gray-400"
                                    label={<span className="text-gray-400">Full name</span>}
                                    name="fullname"
                                    rules={[{ required: true, message: "Please enter your full name" }]}
                                >
                                    <Input
                                        id="fullname"
                                        placeholder="Full name"
                                        className="w-full p-2.5 border-t-0 border-l-0 border-r-0 shadow-none focus:ring-0 focus:outline-none outline-none"
                                    />
                                </Form.Item>
                                <Form.Item
                                    className="text-white"
                                    label={<span className="text-gray-400">Phone</span>}
                                    name="phone"
                                    rules={[{ required: true, message: "Please enter your phone number" }]}
                                >
                                    <Input
                                        id="phone"
                                        placeholder="Phone"
                                        className="w-full p-2.5 border-t-0 border-l-0 border-r-0 shadow-none focus:ring-0 focus:outline-none outline-none"
                                    />
                                </Form.Item>
                                <Form.Item
                                    className="text-gray-400"
                                    label={<span className="text-gray-400">Email</span>}
                                    name="email"
                                    rules={[{ required: true, message: "Please enter your email" }]}
                                >
                                    <Input
                                        id="email"
                                        placeholder="example@gmail.com"
                                        className="w-full p-2.5 border-t-0 border-l-0 border-r-0 shadow-none focus:ring-0 focus:outline-none outline-none"
                                    />
                                </Form.Item>
                                <div className='w-full text-center md:float-end'>
                                    <div className='flex gap-2 items-center justify-center'>
                                        <Form.Item>
                                            <button
                                                onClick={handleReset}
                                                htmlType="button"
                                                className="text-white p-[14px] rounded-md px-[4rem] font-medium bg-orange-600 hover:bg-orange-500"
                                            >
                                                Reset
                                            </button>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                className="p-5 font-medium px-[4rem]"
                                            >
                                                Update
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
