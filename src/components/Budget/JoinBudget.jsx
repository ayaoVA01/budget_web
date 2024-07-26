import React, { useState } from 'react';
import Headers from '../Layout/Header';
import { Link } from "react-router-dom";
import Popup from '../popup/Popup';
import { Button, Form, Input } from "antd";
import { LeftCircleTwoTone } from "@ant-design/icons";

const JoinBuget = () => {
  const [success, setSucces] = useState(true);

  // for reset form
  const [form] = Form.useForm();
  const handleReset = () => {
    form.resetFields();
  };
  
  // for popup function
  const handlePopupClose = () => {
    setSucces(false);
  };
  const triggerPopup = () => {
    setSucces(true);
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
                  type="error"
                  message="Operation completed successfully!"
                  duration={2000}
                  onClose={handlePopupClose}
                />
              )}
              <div className='w-full'>
                <h1 className="text-xl pt-2 text-start font-bold leading-tight tracking-tight md:text-2xl">
                  Join Budget
                </h1>
                <p className='text-sm text-gray-400 mt-2 mb-5'>Paste your SCRETKEY to join your budget.</p>
              </div>
              <Form
                form={form}
                layout="vertical"
                className="row-col w-full"
              >
                <Form.Item
                  className="text-gray-400"
                  label={<span className="text-gray-400">SCRETKEY</span>}
                  name="budgetname"
                  rules={[
                    {
                      required: true,
                      message: " ",
                    },
                  ]}
                >
                  <Input
                    id="budgetname"
                    placeholder="ND56FNJFNJ . FDSJFJDF"
                    className="w-full p-2.5 border-t-0 border-l-0 border-r-0 shadow-none focus:ring-0 focus:outline-none outline-none"
                  />
                </Form.Item>

                <div className='w-full text-center md:float-end'>
                  <div className='flex gap-2 items-center justify-center'>
                    <Form.Item>
                      <Button
                        onClick={handleReset}
                        type="default"
                        className="text-white py-5 p-[14px] rounded-md px-[4rem] font-medium bg-orange-600 hover:bg-orange-500"
                      >
                        Reset
                      </Button>
                    </Form.Item>
                    <Form.Item className='ml-[2rem]'>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full p-5 font-medium px-[4rem]"
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
  )
}

export default JoinBuget
