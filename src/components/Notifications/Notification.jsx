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

    const fetchNotifications = async (userId) => {

        /// the room that i join
        const { data: roomJoined, error: roomJoinedErr } = await supabase
            .from('joining_budget')
            .select()
            .eq('member', userId);

        if (roomJoinedErr) {
            throw roomJoinedErr
        }
        console.log({ roomJoined })

        const myNotification = [];
        roomJoined.map(async (room) => {
            console.log({ room })
            const { data: noteNoti, error: noteNOtiErr } = await supabase
                .from('notification')
                .select(`
                *,
                budget:budget(id, budget_name, owner),
                user_profile(*)
            `)
                .eq('budget_room', room.budget_id)
                .eq(room.allow === true)
                .eq('noti_type' === "NOTE");

            console.log({ noteNoti })

            const { data: fetchNotification, error: errorNotification } = await supabase
                .from('notification')
                .select(`
                *,
                budget:budget(id, budget_name, owner),
                user_profile(*)
            `)
                .eq('budget.owner', userId)
                .not('budget', 'is', null);

            console.log({ fetchNotification })
            if (errorNotification) {
                console.error('Error fetching notifications:', errorNotification);
            } else {
                setNotifications(fetchNotification);
                fetchJoiningBudgetStatus(fetchNotification);
            }
            return room; // or some other transformation
        });

    };

    const fetDatafromJoiningBudget = async (budget_room, sender) => {
        const { data: joinTable, error: joinTableError } = await supabase
            .from('joining_budget')
            .select()
            .eq('budget_id', budget_room)
            .eq('member', sender);

        setBudget_Room(budget_room)

        console.log({ joinTable })
        if (joinTableError) {
            throw joinTableError;
        }
        return joinTable[0]?.allow; // Adjust this to match your data structure
    };

    const fetchJoiningBudgetStatus = async (notifications) => {
        const status = {};
        for (let item of notifications) {
            const allow = await fetDatafromJoiningBudget(item.budget_room, item.sender);
            status[item.id] = allow;
        }
        setJoiningBudgetStatus(status);
    };

    useEffect(() => {
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
                { event: '*', schema: 'public', table: 'joining_budget', filter: `budget_id=eq.${userId}` },
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

    useEffect(() => {
        if (sessionId) {
            fetchNotifications(sessionId);
        }
    }, [sessionId]);

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

            setJoiningBudgetStatus((prevStatus) => ({
                ...prevStatus,
                [budget_room]: true,
            }));

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
                                        item.noti_type === 'ACCEPT_JOIN_ROOM'
                                            ? [
                                                joiningBudgetStatus[item.id] === false
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
                                                    >
                                                        Approved
                                                    </Button>
                                                ]
                                                : null
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
