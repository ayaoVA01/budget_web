import React, { useState, useEffect } from 'react';
import { List, Avatar, Button, Skeleton, notification as antNotification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LeftCircleTwoTone } from '@ant-design/icons';
import Headers from '../Layout/Header';
import { supabase } from '../../services/supabaseClient';
import avatar from '../../assets/images/stickman.webp';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const [joinData, setJoinData] = useState([]);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const fetchNotifications = async () => {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
            console.error('Error fetching session:', sessionError);
            return;
        }

        const userId = sessionData.session.user.id;
        setSessionId(userId);

        const { data: fetchNotification, error: errorNotification } = await supabase
            .from('notification')
            .select(`
                *,
                budget:budget(id, budget_name, owner),
                user_profile(*)
            `)
            .eq('budget.owner', userId)
            .not('budget', 'is', null);

        if (errorNotification) {
            console.error('Error fetching notifications:', errorNotification);
        } else {
            setNotifications(fetchNotification);
        }


        console.log({ fetchNotification })


    };
//NGZiYjE2NWQtZThiOS00YTIyLTlhNzQtMjgxMDZkZDUwZmRl = yao test
    const fetDatafromJoiningBudget = async (budget_room, sender) => {

        const { data: joinTable, error: joinTableError } = await supabase
            .from('joining_budget')
            .select()
            .eq('budget_id', budget_room)
            .eq('member', sender)
            // .single();

        if (joinTableError) {
            throw joinTableError;
        }

        console.log("dasdasd",budget_room)
        console.log("dasdasd sender",sender)
        console.log("Hello",{joinTable})
        return joinTable.allow;
    }

    useEffect(() => {
        fetchNotifications();

        // Uncomment and update the following for real-time updates if needed
        const channel = supabase
            .channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'notification' },
                (payload) => {
                    console.log('Change received!', payload);
                    fetchNotifications(); // Re-fetch data when a change is detected
                }
            )
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    console.log('Subscribed to changes.');
                }
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [sessionId]);

    const handleApprove = async (budget_room) => {
        try {
            const { data: accept, error: acceptError } = await supabase
                .from('joining_budget')
                .update({ allow: false })
                .eq('budget_id', budget_room)
                .select();

            if (acceptError) {
                throw acceptError;
            }

            antNotification.success({
                message: 'Success!',
                description: 'Member has been approved.'
            });

            // const updatedNotifications = notifications.map(notification =>
            //     notification.id === id ? { ...notification, noti_type: 'ACCEPT_JOIN_ROOM' } : notification
            // );
            // setNotifications(updatedNotifications);

            // console.log({ accept });
            // console.log(notifications);

        } catch (error) {
            console.error('Error approving notification:', error);
            antNotification.error({
                message: 'Approval Failed',
                description: 'There was an error approving the member.'
            });
        }
    };

    return (
        <>
            <Headers />
            <div className="w-full mx-auto sm:max-w-[70rem] md:mt-0 xl:p-0">
                <div className="bg-white p-6 rounded-lg border border-b-0 border-r-0 border-l-0 border-gray-200">
                    <div className="max-w-4xl mx-auto p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <Button onClick={handleBack} icon={<LeftCircleTwoTone />} />
                            <h1 className="text-2xl font-bold">Notifications</h1>
                        </div>
                        <List
                            itemLayout="horizontal"
                            dataSource={notifications}

                            renderItem={(item) => (

                                <List.Item
                                    actions={

                                        // item.noti_type === 'NOTE'

                                        fetDatafromJoiningBudget(item.budget_room, item.sender).then(result => (
                                            
                                            result


                                                ? [
                                                    <Button
                                                        type="primary"
                                                        onClick={() => handleApprove(item.budget_room)}
                                                    >
                                                        Approve 
                                                    </Button>
                                                    
                                                ]
                                                : item.noti_type === 'ACCEPT_JOIN_ROOM'
                                                    ? [
                                                        <Button
                                                            type="dashed"
                                                            disabled
                                                        >
                                                            Approved
                                                        </Button>
                                                    ]
                                                    : null
                                        ))
                                    }
                                >
                                    <Skeleton avatar title={false} loading={item.loading} active>
                                        <List.Item.Meta
                                            avatar={<Avatar src={avatar} />}
                                            title={item.noti_type === 'ACCEPT_JOIN_ROOM' ? 'Join Request' : item.budget.budget_name}
                                            description={item.description}
                                        />
                                    </Skeleton>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationPage;
