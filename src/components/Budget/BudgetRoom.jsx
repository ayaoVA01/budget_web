
import Headers from '../Layout/Header';
import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import avatar from '../../assets/images/stickman.webp'
import { Button, Form, Input, InputNumber, Select, Modal } from 'antd';
import { Link } from 'react-router-dom';
import BudgetFormRole from '../roleMember';
// import Popup from '../popup/Popup';

import {
  PlusCircleFilled,
  LeftCircleTwoTone,
  XOutlined
} from "@ant-design/icons";

const { Option } = Select;
const ButgetRoom = () => {
  // fir the popup page 

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        console.log('Checkout values:', values);
        // Perform checkout logic here (e.g., API call)
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



  const [isVisible, setIsVisible] = useState(false);
  const [isUserRole, setUserRole] = useState(false);
  // for reset form
  const [form] = Form.useForm();
  const handleReset = () => {
    form.resetFields();
  };


  // Function to handle toggle
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };


  return (
    <div className='px-5 lg:max-w-[70rem] mx-auto'>

      <div className='sticky top-0'>
        <Headers className='top-0' />
        <Link to='/home' className='flex gap-2 text-gray-500 bg-white pt-3'>
          <LeftCircleTwoTone />
          back
        </Link>
        <p className='pt-5 px-4 text-gray-500 text-sm bg-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus pariatur sint, iure nemo optio dignissimos consequuntur illum beatae sit cum rem?</p>

        <div className='flex pt-4 justify-between  bg-white'>
          <div className=' px-4  border-b'>
            <p className='text-sm text-gray-500'> Amount: ₩ <span className='text-blue-500 font-bold text-[20px]'>20.000.00 </span></p>
          </div>
          <div className='border-b hover:border-blue-500 hover:text-blue-500'>
            <button onClick={toggleVisibility} className='text-gray-500 text-sm p-4 hover:text-blue-500'>Member</button>
          </div>
        </div>
      </div>

      {/* for see menber  */}
      {isUserRole && (
        <div>
          <UserRole
          />
        </div>
      )}


      <div className='mb-[10rem]'>
        <div className='float-end  '>
          <Button className='p-5 fixed bottom-10 -ml-[3.5rem]' onClick={showModal}>
            <PlusCircleFilled className='text-blue-500' />
          </Button>
        </div>
        {/* chat detail */}
        <div className='text-gray-500 text-sm mt-5 flex gap-2'>
          <div>
            <img className='w-[30px] h-[30px] object-cover rounded-[100%] border' src={avatar} alt="" />
          </div>
          <div className='border-b '>
            <p className='text-orange-500'>withdraw </p>
            <p className='text-blue-500 font-bold'>₩ 300.00</p>
            <p className='p-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, quasi.</p>
          </div>
        </div>
        {/* my chat right  */}
        <div className='text-gray-500 text-sm mt-5 gap-2 flex  justify-end'>
          <div className='border-b text-end'>
            <p className='text-green-500 '>pay</p>
            <p className='text-blue-500 font-bold'> ₩ 300.00</p>
            <p className='p-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, quasi.</p>
          </div>
          <div className=''>
            <img className='w-[30px] h-[30px] object-cover rounded-[100%] border' src={avatar} alt="" />
          </div>
        </div>



        <div className='text-gray-500 text-sm mt-5 flex gap-2'>
          <div>
            <img className='w-[30px] h-[30px] object-cover rounded-[100%] border' src={avatar} alt="" />
          </div>
          <div className='border-b '>
            <p className='text-orange-500'>withdraw </p>
            <p className='text-blue-500 font-bold'>₩ 300.00</p>
            <p className='p-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, quasi.</p>
          </div>
        </div>


        <div className='text-gray-500 text-sm mt-5 flex gap-2'>
          <div>
            <img className='w-[30px] h-[30px] object-cover rounded-[100%] border' src={avatar} alt="" />
          </div>
          <div className='border-b '>
            <p className='text-orange-500'>withdraw </p>
            <p className='text-blue-500 font-bold'> ₩ 300.00</p>
            <p className='p-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, quasi.</p>
          </div>
        </div>
        <div className='text-gray-500 text-sm mt-5 flex gap-2'>
          <div>
            <img className='w-[30px] h-[30px] object-cover rounded-[100%] border' src={avatar} alt="" />
          </div>
          <div className='border-b '>
            <p className='text-orange-500'>withdraw </p>
            <p className='text-blue-500 font-bold'>₩ 300.00</p>
            <p className='p-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, quasi.</p>
          </div>
        </div>
        <div className='text-gray-500 text-sm mt-5 flex gap-2'>
          <div>
            <img className='w-[30px] h-[30px] object-cover rounded-[100%] border' src={avatar} alt="" />
          </div>
          <div className='border-b '>
            <p className='text-orange-500'>withdraw </p>
            <p className='text-blue-500 font-bold'>₩ 300.00</p>
            <p className='p-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, quasi.</p>
          </div>
        </div>
        <div className='text-gray-500 text-sm mt-5 flex gap-2'>
          <div>
            <img className='w-[30px] h-[30px] object-cover rounded-[100%] border' src={avatar} alt="" />
          </div>
          <div className='border-b '>
            <p className='text-orange-500'>withdraw </p>
            <p className='text-blue-500 font-bold'>₩ 300.00</p>
            <p className='p-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, quasi.</p>
          </div>
        </div>
        <div className='text-gray-500 text-sm mt-5 flex gap-2'>
          <div>
            <img className='w-[30px] h-[30px] object-cover rounded-[100%] border' src={avatar} alt="" />
          </div>
          <div className='border-b '>
            <p className='text-orange-500'>withdraw </p>
            <p className='text-blue-500 font-bold'>₩ 300.00</p>
            <p className='p-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, quasi.</p>
          </div>
        </div>
        {/* my chat right  */}
        <div className='text-gray-500 text-sm mt-5 gap-2 flex  justify-end'>
          <div className='border-b text-end'>
            <p className='text-green-500 '>pay</p>
            <p className='text-blue-500 font-bold'>₩ 300.00</p>
            <p className='p-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, quasi.</p>
          </div>
          <div className=''>
            <img className='w-[30px] h-[30px] object-contain rounded-[100%] border' src={avatar} alt="" />
          </div>
        </div>
      </div>

      {/* form for input buget detail */}


      {isVisible && (
        <div className='w-full transition-all duration-1000 ease-in-out '>
          <div className=' px-[1rem] fixed rounded-lg border   xl:left-80 xl:right-80  bottom-1 left-4 right-4 bg-gray-100'>
            <div className='p-3 mb-3 ml-4 '>
              <Button className='float-end text-orange-500' onClick={toggleVisibility}>
                close
              </Button>
              <Button className='float-end mx-4 text-blue-500' >
                apply
              </Button>
            </div>

            <div className=''>
              <div className='w-full '>
                <h1 className="text-xl pt-2 text-start font-bold leading-tight tracking-tight  md:text-2xl">
                  All member
                </h1>
                <p className='text-sm text-gray-400 mt-2 mb-5'>It's will be push to everyone and you cann't edit latter.</p>
              </div>
              
              <div >
              <BudgetFormRole
              img={avatar}
              name='yao'
              phone='-098482'
              budgetrole='admin'
              
              />
              <BudgetFormRole
              img={avatar}
              name='yao'
              phone='-098482'
              budgetrole='admin'
              />
              <BudgetFormRole
              img={avatar}
              name='yao'
              phone='-098482'
              budgetrole='Member'
              />
            </div>
            </div>
          </div>
        </div>

      )}



      {/* form */}

      <div>
        <Modal
          title="Add your nessages"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            // onFinish={handleRegister}
            // onFinishFailed={onFinishFailed}
            layout="vertical"
            className="row-col w-full"
          >
            <Form.Item
              className=" text-gray-400"
              label={<span className=" text-gray-400">Status</span>}
              name="Status"

              rules={[
                {
                  required: true,
                  message: " ",
                },
              ]}
            >
              <Input id="budgetname" placeholder="Budget name "
                className="w-full p-2.5 border-t-0 border-l-0 border-r-0 shadow-none   focus:ring-0 focus:outline-none outline-none"
              />
            </Form.Item>
            <Form.Item
              className=" text-white"
              label={<span className=" text-gray-400">Budget</span>}
              name="budget"
              rules={[
                {
                  required: true,
                  message: " ",
                },
              ]}
            >
              <InputNumber id="budget" placeholder="1.xxxx.xx"
                min={0}
                step={0.01}
                formatter={value => `₩ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\₩\s?|(,*)/g, '')}
                className="w-full p-2.5 border-t-0 border-l-0 border-r-0 shadow-none   focus:ring-0 focus:outline-none outline-none"
              />
            </Form.Item>
            <Form.Item
              className=" text-gray-400"
              label={<span className=" text-gray-400">Description</span>}
              name="description"
              rules={[
                {
                  required: false,
                  message: " ",
                },
              ]}
            >
              <textarea id="description" placeholder="Description"
                className="w-full h-[5rem] rounded-lg p-2.5 border-t-0 border-l-0 border-r-0 shadow-none text-black focus:ring-0 focus:outline-none outline-none"
              />
            </Form.Item>
            
          </Form>
        </Modal>
      </div>

    </div>
  )
}

export default ButgetRoom
