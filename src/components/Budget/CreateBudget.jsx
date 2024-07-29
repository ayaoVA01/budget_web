import React, { useState, useEffect } from 'react';
import Headers from '../Layout/Header';
import { Link } from "react-router-dom";
import Popup from '../popup/Popup';
import PopupBudgetKey from '../popup/PopupSecretKey';
import { Button, Form, Input } from "antd";
import { LeftCircleTwoTone } from "@ant-design/icons";
import { supabase } from "../../services/supabaseClient";
import { encodeKey } from "../../utils/BudgetRoomSecrete";
import { Footer } from 'antd/es/layout/layout';
const CreateBudget = () => {
  const [form] = Form.useForm();
  const [success, setSuccess] = useState({ success: false, id: null });
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: sessionData, error: userError } = await supabase.auth.getSession();
      if (userError) {
        console.error('Error fetching session:', userError);
      } else {
        setUserData(sessionData.session.user);
      }
    };

    fetchSession();
  }, []);



  // console.log({ userData })
  const handleReset = () => {
    form.resetFields();
  };

  const handlePopupClose = () => {
    setSuccess({ success: false, id: null });
    setError(null);
  };

  const onFinish = async (values) => {
    // console.log({ values })
    const { budgetname, budget, description } = values;

    const { data, error } = await supabase
      .from('budget')
      .insert([{ budget_name: budgetname, budget_amount: parseFloat(budget), description, owner: userData.id }])
      .select();

    const { addJooiningRoomData: addJoiningRoom, error: addJoiningError } = await supabase
      .from('joining_budget')
      .insert([{ member: userData.id, budget_id: data[0].id, allow: true, role: 'ADMIN' }])
      .select();

    if (addJoiningError) {
      console.log("error: ", addJoiningError);
      setError(error.message);
    }

    // console.log({ data })
    if (error) {
      setError(error.message);
    } else {
      setSuccess({ success: true, id: data[0].id });
      handleReset();
    }
  };

  return (
    <div>
      <Headers />
      <div className="w-full mx-auto sm:max-w-[70rem] md:mt-0 xl:p-0">
        <div className="p-6 w-full bg-white mb-[4rem] space-y-4 sm:p-8 rounded-lg border border-b-0 border-r-0 border-l-0 border-gray-200">
          <Link to='/home' className='flex gap-2 text-gray-500'>
            <LeftCircleTwoTone />
            back
          </Link>
          <div className='lg:flex sm-max:flex-col gap-2 justify-center'>
            {success.success && (
              <PopupBudgetKey
                message='Create Successfully!'
                type='success'
                Scretkey={encodeKey(success.id)}
                onClose={handlePopupClose}
              />
            )}
            {error && (
              <Popup
                message={`Error: ${error}`}
                type='error'
                duration={3000}
                onClose={handlePopupClose}
              />
            )}
            <div className='w-full '>
              <h1 className="text-xl pt-2 text-start font-bold leading-tight tracking-tight md:text-2xl">
                Create your new Budget.
              </h1>
              <p className='text-sm text-gray-400 mt-2 mb-5'>Enter details to create your budget</p>
            </div>
            <Form
              form={form}
              layout="vertical"
              className="row-col w-full"
              onFinish={onFinish}
            >
              <Form.Item
                className="text-gray-400"
                label={<span className="text-gray-400">Budget name</span>}
                name="budgetname"
                rules={[{ required: true, message: "Please enter a budget name" }]}
              >
                <Input
                  id="budgetname"
                  placeholder="Budget name"
                  className="w-full p-2.5 border-t-0 border-l-0 border-r-0 shadow-none focus:ring-0 focus:outline-none outline-none"
                />
              </Form.Item>
              <Form.Item
                className="text-white"
                label={<span className="text-gray-400">Budget</span>}
                name="budget"
                rules={[{ required: true, message: "Please enter a budget amount" }]}
              >
                <Input
                  id="budget"
                  placeholder="1.xxxx.xx"
                  className="w-full p-2.5 border-t-0 border-l-0 border-r-0 shadow-none focus:ring-0 focus:outline-none outline-none"
                />
              </Form.Item>
              <Form.Item
                className="text-gray-400"
                label={<span className="text-gray-400">Description</span>}
                name="description"
                rules={[{ required: false }]}
              >
                <Input
                  id="description"
                  placeholder="Description"
                  className="w-full p-2.5 border-t-0 border-l-0 border-r-0 shadow-none focus:ring-0 focus:outline-none outline-none"
                />
              </Form.Item>
              <div className='w-full text-center md:float-end '>
                <div className='flex gap-2 items-center justify-center'>
                  <Form.Item>
                    <Button
                      onClick={handleReset}
                      type="default"
                      className="text-white p-[14px] py-5 rounded-md px-[4rem] font-medium bg-orange-600 hover:bg-orange-500"
                    >
                      Reset
                    </Button>
                  </Form.Item>
                  <Form.Item className=''>
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
      <Footer />
    </div>
  )
}

export default CreateBudget;
