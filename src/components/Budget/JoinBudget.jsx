import React, { useState } from 'react';
import Headers from '../Layout/Header';
import { Link } from "react-router-dom";
import Popup from '../popup/Popup';
import { Button, Form, Input, notification } from "antd";
import { LeftCircleTwoTone } from "@ant-design/icons";
import { decodeKey } from '../../utils/BudgetRoomSecrete';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';


import { data } from 'autoprefixer';
import Loading from '../loading/Loading';
const JoinBuget = () => {
  const [success, setSucces] = useState(false);
  const navigetor = useNavigate()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false);
  // for reset form
  const [form] = Form.useForm();
  // const [sessionId, setSessionId] = useState(null);
  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const { data, error } = await supabase.auth.getSession();
  //     if (error) {
  //       console.error('Error fetching session:', error);
  //     } else {
  //       setSessionId(data.session.user.id);
  //     }
  //   };

  //   fetchSession();
  // }, []);
  const handleReset = () => {
    form.resetFields();
  };

  // for popup function
  const handlePopupClose = () => {
    setSucces(true);
  };
  const triggerPopup = () => {
    setSucces(true);
  };

  const onFinish = async (values) => {
    setLoading(true);
    const { data: sessionData, error: userError } = await supabase.auth.getSession();
    console.log("on finish")
    const { secretkey } = values;

    const roomId = decodeKey(secretkey);
    const { data: verrifileBudget, error } = await supabase
      .from('budget')
      .select()
      .eq('id', roomId)
      .single();

    if (verrifileBudget) {
      const roomId = decodeKey(secretkey);
      /// check user is joined room or still not

      const { data: userJoined, error: userNotJoined } = await supabase
        .from('joining_budget')
        .select()
        .eq('budget_id', roomId)
        .eq('member', sessionData.session.user.id)
        .single();


      console.log({ userJoined })
      if (userJoined) {
        console.log("alreaedy joined")
        notification.success({
          message: 'Join Room successfully!',
          // description: err.message,
        });
        setLoading(false);
        navigetor(window.open(`room/${verrifileBudget.id}`, '_blank'))
        // navigetor()
        // navigetor(`/room/${verrifileBudget.id}`)
        handleReset();

      } else {
        console.log("still not joined")
        console.log({ roomId })
        console.log({ sessionid: sessionData.session.user.id })

        const { data: joinRoom, error: joinRoomfail } = await supabase
          .from('joining_budget')
          .insert({ budget_id: roomId, member: sessionData.session.user.id, allow: false, role: 'MEMBER' })
          .select();

        console.log("createJoiningRoom", { joinRoom })

        if (joinRoomfail) {
          console.log({ joinRoomfail })
          setError(true)
        }


        if (joinRoom) {
          console.log("join room")
          const { data: noti, error: notiFail } = await supabase
            .from('notification')
            .insert({ budget_room: roomId, sender: sessionData.session.user.id, description: `User ${sessionData.session.user.email} joined room ${verrifileBudget.budget_name}`, noti_type: "ACCEPT_JOIN_ROOM" })
            .select();

          console.log("create noti")
          notification.success({
            message: 'Join Room successfully!',
            // description: err.message,
          });

          console.log({ noti })
          navigetor(`/room/${verrifileBudget.id}`)
          setLoading(false);
          handleReset();
        }

      }

    } else {
      setError(error.message);
    }


  };

  return (
    <div className='w-full h-full flex-col'>
      <Headers />
      <div className='h-[80vh]'>
        <div className="w-full h-full mx-auto sm:max-w-[70rem] md:mt-0 xl:p-0">
          <div className="p-6 w-full bg-white  space-y-4 sm:p-8 rounded-lg border border-b-0 border-r-0 border-l-0 border-gray-200">
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
                onFinish={onFinish}
              >
                <Form.Item
                  className="text-gray-400"
                  label={<span className="text-gray-400">SCRETKEY</span>}
                  name="secretkey"
                  rules={[
                    {
                      required: true,
                      message: " ",
                    },
                  ]}
                >
                  <Input
                    id="secretkey"
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
                        loading={loading}
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
