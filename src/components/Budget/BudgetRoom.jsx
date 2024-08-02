import Headers from '../Layout/Header';
import React, { useState, useEffect } from 'react';
import avatar from '../../assets/images/stickman.webp';
import { Button, Form, Input, InputNumber, Select, Modal, notification } from 'antd';
import { Link, useParams } from 'react-router-dom';
import {
  PlusCircleFilled,
  LeftCircleTwoTone
} from "@ant-design/icons";
import { supabase } from '../../services/supabaseClient';
import Loading from '../loading/Loading'
import Pending from '../loading/Pending';
import Popup from '../popup/Popup';
// import { data } from 'autoprefixer';
const { Option } = Select;


const BudgetRoom = () => {
  const [memberRole, setRole] = useState('MEMBER');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [roomData, setRoomData] = useState('')
  const [noteData, setNoteData] = useState([])
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { roomId } = useParams();
  const [sessionId, setSessionId] = useState(null);
  const [roomMember, setRoomMember] = useState(null);
  const [checkUserPermision, setCheckUserPermision] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  // console.log(roomId)
  //  fetch session id
  useEffect(() => {


    const fetchData = async () => {
      const data = await fetchBudgetData(roomId);
    };
    const checkMemberRole = async () => {
      const userData = await supabase.auth.getSession();

      const { data: memberRole, error: memberRoleError } = await supabase
        .from('joining_budget')
        .select()
        .eq('budget_id', roomId)
        .eq('member', userData.data.session.user.id)
        .single();

      console.log({ memberRole }, "role 1")
      if (memberRole) {
        setRole(memberRole.role)
      }
    }

    checkMemberRole();
    fetchData();

  }, [roomId]);


  const handleReset = () => {
    form.resetFields();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const fetchNoteData = async () => {
    const { data: noteData, error: noteDataError } = await supabase
      .from('note')
      .select('*, create_by(*)')
      .eq('budget_id', roomId);

    if (noteDataError) {
      console.error('Error fetching note data:', noteDataError);
    } else {
      console.log({ "note data": noteData })
      setNoteData(noteData);
    }
    setLoading(false);
  };

  /// user to fetach data realtime
  const fetchBudgetDataNew = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else {
        setSessionId(data.session);
      }



      // Fetch budget data
      const { data: budgetData, error: budgetError } = await supabase
        .from('budget')
        .select()
        .eq('id', roomId)
        .single();

      if (budgetError) {
        throw budgetError;
      }
      setRoomData(budgetData);

      const checkUserPermision = await supabase
        .from('joining_budget')
        .select('*')
        .eq('member', data.session.user.id)
        .eq('budget_id', roomId)
        .eq('allow', true)
        .single();

      if (!checkUserPermision) {
        console.log("check user with null: ", { checkUserPermision })
        setCheckUserPermision(null);
      } else {
        setCheckUserPermision(checkUserPermision.data);
      }

      // for check member data
      const roomMembers = await supabase
        .from('joining_budget')
        .select('*, user_profile:member(*)')
        .eq('budget_id', roomId);

      setRoomMember(roomMembers.data);


      console.log({ roomMomber: roomMembers.data })

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    // Fetch initial data
    fetchBudgetDataNew(roomId);
    fetchNoteData();
    const channel = supabase.channel('custom-all-channel');

    // Subscribe to changes in the 'note' table
    channel.on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'note', filter: `budget_id=eq.${roomId}` },
      (payload) => {
        console.log('Change in note table:', payload);
        fetchNoteData(); // Re-fetch data when a change is detected in 'note' table
      }
    );

    // Subscribe to changes in the 'budget' table
    channel.on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'budget', filter: `id=eq.${roomId}` },
      (payload) => {
        console.log('Change in budget table:', payload);
        fetchBudgetDataNew(roomId); // Re-fetch data when a change is detected in 'budget' table
      }
    );

    // Subscribe to the channel
    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('Subscribed to changes.');
      }
    });


    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };


  }, [roomId]);


  const handleOk = async () => {
    try {
      const userData = await supabase.auth.getSession();
      console.log({ userData })

      const values = await form.validateFields();
      const roomId = roomData.id;

      setIsModalVisible(false);
      form.resetFields();

      const { status, budget, description } = values;

      // Insert note
      const { data: notesData, error: notesError } = await supabase
        .from('note')
        .insert([{ status, amount: budget, description, budget_id: roomId, create_by: userData.data.session.user.id }])
        .select();

      if (notesError) {
        throw notesError;
      }



      // Calculate updated budget amount
      let amount = roomData.budget_amount;

      if (status === 'PAY') {
        amount -= budget;
      } else {
        amount += budget;
      }

      // Update budget
      const { data: intoBudget, error: intoBudgetError } = await supabase
        .from('budget')
        .update({ budget_amount: amount })
        .eq('id', roomId)
        .select();

      if (intoBudgetError) {
        throw intoBudgetError;
      }
      notification.success({
        message: 'Success!',

      });


      // console.log('Inserted data:', data);
    } catch (error) {
      notification.error({
        message: 'Oop! try again later.',
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
  const fetchBudgetData = async () => {
    try {
      setLoading(true);

      // fetch session ID 

      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else {
        setSessionId(data.session);
      }



      // Fetch budget data
      const { data: budgetData, error: budgetError } = await supabase
        .from('budget')
        .select()
        .eq('id', roomId)
        .single();

      if (budgetError) {
        throw budgetError;
      }
      setRoomData(budgetData);

      const checkUserPermision = await supabase
        .from('joining_budget')
        .select('*')
        .eq('member', data.session.user.id)
        .eq('budget_id', roomId)
        .eq('allow', true)
        .single();

      if (!checkUserPermision) {
        console.log("check user with null: ", { checkUserPermision })
        setCheckUserPermision(null);
      } else {
        setCheckUserPermision(checkUserPermision.data);
      }

      // for check member data
      const roomMembers = await supabase
        .from('joining_budget')
        .select('*, user_profile:member(*)')
        .eq('budget_id', roomId);

      setRoomMember(roomMembers.data);


      console.log({ roomMomber: roomMembers.data })

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }

  };

  const onUpdate = async (members) => {

    // Update member roles 
    let allUpdates = [];

    for (const member of members.members) {
      const { member_id, role } = member;

      // Prepare the update promise
      const updatePromise = supabase
        .from('joining_budget') // Replace with your actual table name
        .update({ role })
        .eq('id', member_id)
        .then(({ data, error }) => {
          if (error) {
            console.error(`Error updating role for member_id ${member_id}:`, error);
            throw error;
          }
          console.log(`Successfully updated role for member_id ${member_id}:`, data);
          return data;
        })
        .catch(error => {
          console.error(`Unexpected error updating role for member_id ${member_id}:`, error);
        });

      allUpdates.push(updatePromise);
    }

    // Wait for all updates to complete
    try {
      await Promise.all(allUpdates);
      console.log('All updates complete.');
      setSuccess(true)
    } catch (error) {
      console.error('One or more updates failed:', error);
    }
  };

  const handlePopupClose = () => {
    setSuccess(false);
    setError(null);
  };


  /// if not check data then navigate to pending page
  if (!checkUserPermision) {
    return <div> <Pending />  </div>
  }

  if (loading) return <div> <Loading /></div>
  // console.log({ sessionId })

  // console.log({ memberRole })

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

        {success && (
          <Popup
            message='Update Member Role Successfully!'
            type='success'
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


        {noteData.map((items, index) => {
          if (items.create_by.user_id === sessionId.user.id) {
            return (
              <div key={index}>
                <div className='text-gray-500 text-sm mt-5 gap-2 flex justify-end'>
                  <div className='border-b text-end'>
                    <p className='text-blue-500 font-bold'>
                      ₩ {items.amount} &nbsp; &nbsp;


                      {items.status === 'PAY' ? (
                        <span className='text-orange-500'>:{items.status}</span>
                      ) : (
                        <span className='text-green-500'>:{items.status}</span>
                      )}
                    </p>
                    <p className='p-3'>{items.description}</p>
                  </div>
                  <div>
                    <img className='w-[30px] h-[30px] object-contain rounded-[100%] border' src={avatar} alt="" />
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div key={index} className='text-gray-500 text-sm mt-5 flex gap-2'>
                <div>
                  <img className='w-[30px] h-[30px] object-cover rounded-[100%] border' src={avatar} alt="" />
                </div>
                <div className='border-b'>
                  <p className='text-gray-700 font-medium'>{items.create_by.full_name}</p>

                  <p className='text-blue-500 font-bold'>
                    {items.status === 'PAY' ? (
                      <span className=' text-orange-500'> {items.status} :</span>
                    ) : (
                      <span className='text-green-500'> {items.status} :</span>
                    )} &nbsp; &nbsp;
                    ₩ {items.amount}</p>
                  <p className='p-3'>{items.description}</p>
                </div>
              </div>
            )
          }
        }
        )}
      </div>

      {isVisible && (

        <div className='w-full transition-all duration-1000 ease-in-out'>


          {memberRole === 'ADMIN' ? (
            <Form
              // initialValues={{ members: roomMember.map(member => ({ role: member.role || 'MEMBER' })) }}
              form={form}
              onFinish={onUpdate}
            >
              <div className='px-[1rem] fixed rounded-lg border xl:left-80 xl:right-80 bottom-1 left-4 right-4 bg-gray-100'>

                <div className='p-3 mb-3 ml-4'>
                  <Button className='float-end text-orange-500' onClick={toggleVisibility}>
                    close
                  </Button>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      className='float-end mx-4 text-blue-500'
                    >
                      apply
                    </Button>
                  </Form.Item>
                  {/* <Button className='float-end mx-4 text-blue-500'>
                    apply
                  </Button> */}
                </div>
                <div>
                  <div className='w-full'>
                    <h1 className="text-xl pt-2 text-start font-bold leading-tight tracking-tight md:text-2xl">
                      All member
                    </h1>
                    <p className='text-sm text-gray-400 mt-2 mb-5'>It's will be push to everyone and you can't edit later.</p>
                  </div>
                  <div>

                    {roomMember.map((items, index) => {
                      // console.log('items: ', items)
                      // console.log(profileData.id, 'hsudhauda ddata profile')
                      // if (items.member === profileData.id) {
                      return (
                        <div key={index} className='w-full px-4'>
                          <div className='flex w-full justify-between items-center my-2'>
                            <div className='flex gap-2 items-center'>
                              <img src={avatar} alt="" className='w-[30px] h-[30px] object-cover rounded-[100%] border' />
                              <div>
                                <p className='text-sm'>{items.user_profile.full_name}</p>
                                <p className='text-sm text-blue-500'>{items.user_profile.phone}</p>
                              </div>
                            </div>
                            <div>

                              <Form.Item
                                className=""
                                name={['members', index, 'member_id']}
                                initialValue={items.id}
                                style={{ display: 'none' }}
                              >
                                <Input type="hidden" />
                              </Form.Item>
                              <Form.Item
                                className="text-gray-400 w-[100px]"
                                name={['members', index, 'role']}
                                rules={[{ required: true, message: "" }]}
                                initialValue={items.role}
                              >

                                <Select className="border-t-0 h-10 border-l-0 border-r-0 shadow-none focus:ring-0 focus:outline-none outline-none">
                                  <Option value="ADMIN">Admin</Option>
                                  <Option value="MEMBER">Member</Option>

                                </Select>
                              </Form.Item>

                            </div>
                          </div>
                        </div>
                      )
                      // }
                    })}
                  </div>
                </div>

              </div>
            </Form>


          ) : (

            <div className=''>

              <div className='px-[1rem] fixed rounded-lg border xl:left-80 xl:right-80 bottom-1 left-4 right-4 bg-gray-100'>

                <div className='p-3 mb-3 ml-4'>
                  <Button className='float-end text-orange-500' onClick={toggleVisibility}>
                    close
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
                    {roomMember.map((items, index) => {

                      return (
                        <div key={index} className='w-full px-4'>
                          <div className='flex w-full justify-between items-center my-2'>
                            <div className='flex gap-2 items-center'>
                              <img src={avatar} alt="" className='w-[30px] h-[30px] object-cover rounded-[100%] border' />
                              <div>
                                <p className='text-sm'>{items.user_profile.full_name}</p>
                                <p className='text-sm text-blue-500'>{items.user_profile.phone}</p>
                              </div>
                            </div>
                            <div>

                              <p className='text-blue-500'>{items.role}</p>

                            </div>
                          </div>
                        </div>

                      )


                    })}
                  </div>

                </div>
              </div>






            </div>

          )}
        </div>

      )
      }

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
              className="text-gray-400"
              label={<span className="text-gray-400">Status</span>}
              name="status"
              rules={[{ required: true, message: " " }]}
            >
              <Select
                id="status"
                placeholder="Select status"
                className="w-full h-10  border-t-0 border-l-0 border-r-0 shadow-none focus:ring-0 focus:outline-none outline-none"
              >
                <Option value="PAY">PAY</Option>
                <Option value="DEPOSIT">DEPOSIT</Option>
              </Select>
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
    </div >
  );
}

export default BudgetRoom;
