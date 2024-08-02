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
    const [budget_Room, setBudget_Room] = useState(null)
    const [joiningBudgetStatus, setJoiningBudgetStatus] = useState({});
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    // const fetchNotifications = async (userId) => {

    //     /// the room that i join
    //     const { data: roomJoined, error: roomJoinedErr } = await supabase
    //         .from('joining_budget')
    //         .select()
    //         .eq('member', userId);

    //     if (roomJoinedErr) {
    //         throw roomJoinedErr
    //     }
    //     console.log({ roomJoined })

    //     /// to tech all my notification
    //     const myNotification = [];
    //     await Promise.all(roomJoined.map(async (room, index) => {
    //         console.log({ room });

    //         // if (!room.allow) {
    //         //     return null;
    //         // }

    //         const { data: noteNoti, error: noteNOtiErr } = await supabase
    //             .from('notification')
    //             .select(`
    //             *,
    //             budget:budget(id, budget_name, owner),
    //             user_profile(*)
    //         `)
    //             .eq('budget_room', room.budget_id)
    //             .eq('noti_type', 'NOTE')
    //             .not('sender', 'eq', userId);

    //         if (noteNOtiErr) {
    //             console.error('Error fetching notifications:', noteNOtiErr);
    //             return;
    //         }

    //         if (noteNoti) {
    //             myNotification.push(...noteNoti);
    //         }

    //         // Fetch joining budget notification
    //         const { data: fetchNotification, error: errorNotification } = await supabase
    //             .from('notification')
    //             .select(`
    //             *,
    //             budget:budget(id, budget_name, owner),
    //             user_profile(*)
    //         `)
    //             .eq('budget.owner', userId)
    //             .eq('budget_room', room.budget_id)
    //             .eq('noti_type', 'ACCEPT_JOIN_ROOM')
    //             .not('sender', 'eq', userId);

    //         if (errorNotification) {
    //             console.error('Error fetching notifications:', errorNotification);
    //             return;
    //         }

    //         if (fetchNotification) {

    //             fetchNotification.forEach(async notification => {
    //                 const { data: allowJoining, error: allowJoiningError } = await supabase
    //                     .from('joining_budget')
    //                     .select()
    //                     .eq('budget_id', notification.budget_room)
    //                     .eq('member', notification.sender)
    //                     .single();

    //                 if (allowJoiningError) {
    //                     throw allowJoiningError;
    //                 }
    //                 console.log({ allowJoining })
    //                 notification.allow = allowJoining.allow; // Add allow field to each notification
    //             });
    //             myNotification.push(...fetchNotification);
    //         }
    //     }));

    //     // console.log({ myNotification })
    //     setNotifications(myNotification);
    //     // fetchJoiningBudgetStatus(fetchNotification);

    // };
    // console.log({ notifications })


    // useEffect(() => {
    //     // Fetch initial data
    //     fetchBudgetDataNew(roomId);
    //     fetchNoteData();
    //     const channel = supabase.channel('custom-all-channel');

    //     // Subscribe to changes in the 'note' table
    //     channel.on(
    //         'postgres_changes',
    //         { event: '*', schema: 'public', table: 'note', filter: `budget_id=eq.${roomId}` },
    //         (payload) => {
    //             console.log('Change in note table:', payload);
    //             fetchNoteData(); // Re-fetch data when a change is detected in 'note' table
    //         }
    //     );

    //     // Subscribe to changes in the 'budget' table
    //     channel.on(
    //         'postgres_changes',
    //         { event: '*', schema: 'public', table: 'budget', filter: `id=eq.${roomId}` },
    //         (payload) => {
    //             console.log('Change in budget table:', payload);
    //             fetchBudgetDataNew(roomId); // Re-fetch data when a change is detected in 'budget' table
    //         }
    //     );

    //     // Subscribe to the channel
    //     channel.subscribe((status) => {
    //         if (status === 'SUBSCRIBED') {
    //             console.log('Subscribed to changes.');
    //         }
    //     });


    //     // Cleanup subscription on component unmount
    //     return () => {
    //         supabase.removeChannel(channel);
    //     };


    // }, [roomId]);


    const fetchNotifications = async (userId) => {
        try {
            // Fetch the rooms that the user has joined
            const { data: roomJoined, error: roomJoinedErr } = await supabase
                .from('joining_budget')
                .select()
                .eq('member', userId);

            if (roomJoinedErr) {
                throw roomJoinedErr;
            }
            console.log({ roomJoined });

            // To collect all notifications
            const myNotification = [];

            await Promise.all(roomJoined.map(async (room) => {
                console.log({ room });

                const { data: noteNoti, error: noteNOtiErr } = await supabase
                    .from('notification')
                    .select(`
                    *,
                    budget:budget(id, budget_name, owner),
                    user_profile(*)
                `)
                    .eq('budget_room', room.budget_id)
                    .eq('noti_type', 'NOTE')
                    .not('sender', 'eq', userId);

                if (noteNOtiErr) {
                    console.error('Error fetching notifications:', noteNOtiErr);
                    return;
                }

                if (noteNoti) {
                    noteNoti.forEach(notification => {
                        notification.allow = room.allow;
                    });
                    myNotification.push(...noteNoti);
                }

                const { data: fetchNotification, error: errorNotification } = await supabase
                    .from('notification')
                    .select(`
                    *,
                    budget:budget(id, budget_name, owner),
                    user_profile(*)
                `)
                    .eq('budget.owner', userId)
                    .eq('budget_room', room.budget_id)
                    .eq('noti_type', 'ACCEPT_JOIN_ROOM')
                    .not('sender', 'eq', userId);

                if (errorNotification) {
                    console.error('Error fetching notifications:', errorNotification);
                    return;
                }

                if (fetchNotification) {
                    fetchNotification.forEach(async notification => {
                        const { data: allowJoining, error: allowJoiningError } = await supabase
                            .from('joining_budget')
                            .select()
                            .eq('budget_id', notification.budget_room)
                            .eq('member', notification.sender)
                            .single();

                        if (allowJoiningError) {
                            throw allowJoiningError;
                        }
                        console.log({ allowJoining })
                        notification.allow = allowJoining.allow; // Add allow field to each notification
                    });
                    myNotification.push(...fetchNotification);
                }
            }));

            // console.log({ myNotification }, "out of loop");
            return myNotification;
        } catch (error) {
            console.error('Error in fetchNotifications:', error.message);
            throw error;
        }
    };

    useEffect(() => {
        const fetchAndSetNotifications = async () => {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) {
                console.error('Error fetching session:', sessionError);
                return;
            }
            try {
                const notifications = await fetchNotifications(sessionData.session.user.id);
                setNotifications(notifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchAndSetNotifications();
        const getSessionAndSubscribe = async () => {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) {
                console.error('Error fetching session:', sessionError);
                return;
            }

            const userId = sessionData.session.user.id;
            setSessionId(userId);
            fetchNotifications(userId);

            // fetDatafromJoiningBudget()
            const channel = supabase
                .channel('custom-all-channel')
            channel.on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'notification', filter: `budget_id=eq.${userId}` },
                (payload) => {
                    console.log('Change received!', payload);
                    fetchNotifications(userId);
                    // fetDatafromJoiningBudget() // Re-fetch data when a change is detected
                }
            )

                .subscribe((status) => {
                    if (status === 'SUBSCRIBED') {
                        console.log('Subscribed to changes.');
                    }
                });

            // Cleanup subscription on component unmount
            return () => {
                supabase.removeChannel(channel);
            };
        };

        getSessionAndSubscribe();
    }, []);

    // useEffect(() => {
    //     const fetchAndSetNotifications = async () => {
    //         try {
    //             const notifications = await fetchNotifications(userId);
    //             setNotifications(notifications);
    //         } catch (error) {
    //             console.error('Error fetching notifications:', error);
    //         }
    //     };

    //     fetchAndSetNotifications();
    // }, [userId]);



    const handleApprove = async (budget_room, sender) => {
        try {
            const { data: accept, error: acceptError } = await supabase
                .from('joining_budget')
                .update({ allow: true })
                .eq('budget_id', budget_room)
                .eq('member', sender)
                .select();
            if (acceptError) {
                throw acceptError;
            }
            console.log({ accept });
            antNotification.success({
                message: 'Success!',
                description: 'Member has been approved.'
            });

            // setJoiningBudgetStatus((prevStatus) => ({
            //     ...prevStatus,
            //     [budget_room]: true,
            // }));

        } catch (error) {
            console.error('Error approving notification:', error);
            antNotification.error({
                message: 'Approval Failed',
                description: 'There was an error approving the member.'
            });
        }
    };
    console.log({ ready: notifications })

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
                                        item.noti_type === 'ACCEPT_JOIN_ROOM'
                                            ? [
                                                item.allow === false
                                                    ? <Button
                                                        type="primary"
                                                        onClick={() => handleApprove(item.budget_room, item.sender)}
                                                    >
                                                        Approve
                                                    </Button>
                                                    : <Button
                                                        type="dashed"
                                                        disabled
                                                    >
                                                        Approved
                                                    </Button>
                                            ]
                                            : item.noti_type === 'NOTE'
                                                ? [
                                                    <Button
                                                        type="dashed"
                                                        disabled
                                                        className='hidden'
                                                    >
                                                        Approved
                                                    </Button>
                                                ] :
                                                null

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
