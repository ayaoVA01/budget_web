import Headers from '../Layout/Header';
import React, { useState, useEffect } from 'react';
import avatar from '../../assets/images/stickman.webp';
import { Button, Form, Input, InputNumber, Select, Modal,notification } from 'antd';
import { Link } from 'react-router-dom';
import {
  PlusCircleFilled,
  LeftCircleTwoTone
} from "@ant-design/icons";
import { supabase } from '../../services/supabaseClient';
import Loading from '../loading/Loading'
import { data } from 'autoprefixer';
const { Option } = Select;

const BudgetRoom = () => {
  const [role, setRole] = useState('admin');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isUserRole, setUserRole] = useState(false);
  const [roomData, setRoomData] = useState('')
  const [noteData,setNoteData] = useState('')
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };


  // function for send note or message.


  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // console.log('Checkout values:', values);
      const roomId = roomData.id
      // console.log('room IDD',roomId)
      setIsModalVisible(false);
      form.resetFields();
      const { status, budget, description } = values;
      const { data, error } = await supabase
        .from('note')
        .insert([{ status, amount: budget, description, budget_id:roomId}])
        .select();
      if (error) {
        throw error;
      }
      notification.success({
        message: 'Send message Successful'

      });

      // console.log('Inserted data:', data);
    } catch (error) {
      notification.error({
        message: 'Send Failed Please try again later!',
        
    });
      console.error('Error inserting data:', error);
    }
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const fetchBudgetData = async (id) => {
    try {
      setLoading(true);
  
      // Fetch budget data
      const { data: budgetData, error: budgetError } = await supabase
        .from('budget')
        .select()
        .eq('id', id)
        .single();
      
      if (budgetError) {
        throw budgetError;
      }
      setRoomData(budgetData);
      console.log('Room ID:', budgetData.id);
  
      // Fetch note data
      const { data: noteData, error: noteError } = await supabase
        .from('note')
        .select()
        .eq('budget_id', budgetData.id);
  
      if (noteError) {
        throw noteError;
      }
  
      console.log({noteData})
      setNoteData(noteData);
  
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const roomId = roomData.id
  // console.log(roomId,'hello id')


  const budgetId = '1a4042d9-b7c8-41d0-b261-84224280c253';

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBudgetData(budgetId);


  
      // console.log('hello', data.id)

      // if (data) {
      //   form.setFieldsValue({
      //     Status: data.status,
      //     budget: data.budget,
      //     description: data.description,
      //   });

      // }
    };
    fetchData();
  }, [budgetId]);

  noteData.map((items,index)=>{
    console.log(items.id)
  })
  // console.log(roomData.budget_name)

  if (loading) return <div> <Loading /></div>
  return (
    <div className='px-5 lg:max-w-[70rem] mx-auto'>
      <div className='sticky top-0'>
        <Headers className='top-0' />
        <Link to='/home' className='flex gap-2 text-gray-500 bg-white pt-3'>
          <LeftCircleTwoTone />
          back
        </Link>

        <p className='pt-5 px-4 text-gray-500 text-sm bg-white'>
          {roomData.description}
        </p>
        <div className='flex pt-4 justify-between bg-white'>
          <div className='px-4 border-b'>
            <p className='text-sm text-gray-500'>
              Amount: ₩ <span className='text-blue-500 font-bold text-[20px]'>{roomData.budget_amount}</span>
            </p>
          </div>
          <div className='border-b hover:border-blue-500 hover:text-blue-500'>
            <button onClick={toggleVisibility} className='text-gray-500 text-sm p-4 hover:text-blue-500'>
              Member
            </button>
          </div>
        </div>
      </div>



      <div className='mb-[10rem]'>
        <div className='float-end'>
          <Button className='p-5 fixed bottom-10 -ml-[3.5rem]' onClick={showModal}>
            <PlusCircleFilled className='text-blue-500' />
          </Button>
        </div>

        <div className='text-gray-500 text-sm mt-5 flex gap-2'>
          <div>
            <img className='w-[30px] h-[30px] object-cover rounded-[100%] border' src={avatar} alt="" />
          </div>
          <div className='border-b'>
            <p className='text-orange-500'>{noteData.status}</p>
            <p className='text-blue-500 font-bold'>₩ 300.00</p>
            <p className='p-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, quasi.</p>
          </div>
        </div>

        <div className='text-gray-500 text-sm mt-5 gap-2 flex justify-end'>
          <div className='border-b text-end'>
            <p className='text-green-500'>pay</p>
            <p className='text-blue-500 font-bold'>₩ 300.00</p>
            <p className='p-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, quasi.</p>
          </div>
          <div>
            <img className='w-[30px] h-[30px] object-contain rounded-[100%] border' src={avatar} alt="" />
          </div>
        </div>
      </div>

      {isVisible && (
        <div className='w-full transition-all duration-1000 ease-in-out'>
          <div className='px-[1rem] fixed rounded-lg border xl:left-80 xl:right-80 bottom-1 left-4 right-4 bg-gray-100'>
            <div className='p-3 mb-3 ml-4'>
              <Button className='float-end text-orange-500' onClick={toggleVisibility}>
                close
              </Button>
              <Button className='float-end mx-4 text-blue-500'>
                apply
              </Button>
            </div>
            <div>
              <div className='w-full'>
                <h1 className="text-xl pt-2 text-start font-bold leading-tight tracking-tight md:text-2xl">
                  All member
                </h1>
                <p className='text-sm text-gray-400 mt-2 mb-5'>It's will be push to everyone and you can't edit later.</p>
              </div>
              <div>
                <div className='w-full px-4'>
                  <div className='flex w-full justify-between items-center my-2'>
                    <div className='flex gap-2 items-center'>
                      <img src={avatar} alt="" className='w-[30px] h-[30px] object-cover rounded-[100%] border' />
                      <div>
                        <p className='text-sm'>Yao</p>
                        <p className='text-sm text-blue-500'>284249203</p>
                      </div>
                    </div>
                    <div>
                      {role === 'admin' ? (
                        <Form initialValues={{ role: 'admin' }}>
                          <Form.Item
                            className="text-gray-400 w-[100px]"
                            name="role"
                            rules={[{ required: true, message: "" }]}
                          >
                            <Select className="border-t-0 h-10 border-l-0 border-r-0 shadow-none focus:ring-0 focus:outline-none outline-none">
                              <Option value="admin">Admin</Option>
                              <Option value="member">Member</Option>
                            </Select>
                          </Form.Item>
                        </Form>
                      ) : (
                        <p className='text-blue-500'>admin</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <Modal
          title="Add your messages"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            layout="vertical"
            className="row-col w-full"
          >
            <Form.Item
              className=" text-gray-400"
              label={<span className=" text-gray-400">Status</span>}
              name="status"
              rules={[{ required: true, message: " " }]}
            >
              <Input
                id="budgetname"
                placeholder="status"
                className="w-full p-2.5 border-t-0 border-l-0 border-r-0 shadow-none focus:ring-0 focus:outline-none outline-none"
              />
            </Form.Item>
            <Form.Item
              className=" text-white"
              label={<span className=" text-gray-400">Budget</span>}
              name="budget"
              rules={[{ required: true, message: " " }]}
            >
              <InputNumber
                id="budget"
                placeholder="1.xxxx.xx"
                min={0}
                step={0.01}
                formatter={value => `₩ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\₩\s?|(,*)/g, '')}
                className="w-full p-2.5 border-t-0 border-l-0 text-gray-300 border-r-0 shadow-none focus:ring-0 focus:outline-none outline-none"
              />
            </Form.Item>
            <Form.Item
              className=" text-gray-400"
              label={<span className=" text-gray-400">Description</span>}
              name="description"
              rules={[{ required: false, message: " " }]}
            >
              <textarea
                id="description"
                placeholder="Description"
                className="w-full h-[5rem] rounded-lg p-2.5 border-t-0 border-l-0 border-r-0 shadow-none text-black focus:ring-0 focus:outline-none outline-none"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default BudgetRoom;
