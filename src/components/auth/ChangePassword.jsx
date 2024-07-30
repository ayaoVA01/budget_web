import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import Headers from '../Layout/Header';
import Popup from '../popup/Popup';
import { Button, Form, Input, notification } from 'antd';
import { LeftCircleTwoTone } from '@ant-design/icons';

const ChangePassword = () => {
  const [success, setSuccess] = useState(false);
  const [form] = Form.useForm();
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else {
        setSessionId(data.session);
        console.log('Session ID:', data.session.user.id);
      }
    };

    fetchSession();
  }, []);


  const handlePopupClose = () => {
    setSuccess(false);
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    const { oldpassword, newpassword, comfirmpassword } = values;

    if (newpassword !== comfirmpassword) {
      notification.error({
        message: 'Error',
        description: 'New password and confirm password do not match',
      });
      return;
    }

    try {
      // Verify old password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: sessionId.user.email,
        password: oldpassword,
      });

      if (signInError) {
        throw new Error('Old password is incorrect');
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newpassword,
      });

      if (updateError) {
        throw updateError;
      }

      // Update success
      setSuccess(true);
      form.resetFields();
      notification.success({
        message: 'Success',
        description: 'Password updated successfully',
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.message,
      });
    }
  };

  return (
    <div>
      <Headers />
      <div>
        <div className="w-full mx-auto sm:max-w-[70rem] md:mt-0 xl:p-0">
          <div className="p-6 w-full bg-white mb-[4rem] space-y-4 sm:p-8 rounded-lg border border-b-0 border-r-0 border-l-0 border-gray-200">
            <Link to="/home" className="flex gap-2 text-gray-500">
              <LeftCircleTwoTone />
              back
            </Link>
            <div className="lg:flex sm-max:flex-col gap-2 justify-center">
              {/* Show success popup */}
              {success && (
                <Popup
                  type="success"
                  message="Update password successfully!"
                  duration={2000}
                  onClose={handlePopupClose}
                />
              )}
              <div className="w-full">
                <h1 className="text-xl pt-2 text-start font-bold leading-tight tracking-tight md:text-2xl">
                  Update Password
                </h1>
                <p className="text-sm text-gray-400 mt-2 mb-5">
                  Enter Your old password and put the new password
                </p>
              </div>
              <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                className="row-col w-full"
              >
                <Form.Item
                  className="text-gray-400"
                  label={<span className="text-gray-400">Old password</span>}
                  name="oldpassword"
                  rules={[
                    {
                      required: true,
                      message: ' ',
                    },
                  ]}
                >
                  <Input.Password
                    id="oldpassword"
                    placeholder="old password"
                    className="w-full p-2.5 border-t-0 border-l-0 border-r-0 shadow-none focus:ring-0 focus:outline-none outline-none"
                  />
                </Form.Item>
                <Form.Item
                  className="text-white"
                  label={<span className="text-gray-400">New password</span>}
                  name="newpassword"
                  rules={[
                    {
                      required: true,
                      message: ' ',
                    },
                  ]}
                >
                  <Input.Password
                    id="newpassword"
                    placeholder="new password"
                    className="w-full p-2.5 border-t-0 border-l-0 border-r-0 shadow-none focus:ring-0 focus:outline-none outline-none"
                  />
                </Form.Item>
                <Form.Item
                  className="text-gray-400"
                  label={<span className="text-gray-400">Confirm password</span>}
                  name="comfirmpassword"
                  rules={[
                    {
                      required: true,
                      message: ' ',
                    },
                  ]}
                >
                  <Input.Password
                    id="comfirmpassword"
                    placeholder="confirm password"
                    className="w-full p-2.5 border-t-0 border-l-0 border-r-0 shadow-none focus:ring-0 focus:outline-none outline-none"
                  />
                </Form.Item>
                <div className="w-full text-center md:float-end">
                  <div className="flex gap-2 items-center justify-center">
                    <Form.Item>
                      <Button
                        onClick={handleReset}
                        htmlType="button"
                        className="text-white py-5 p-[14px] rounded-md px-[4rem] font-medium bg-orange-600 hover:bg-orange-500"
                      >
                        Reset
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="p-5 font-medium px-[4rem]"
                      >
                        Submit
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

export default ChangePassword;
