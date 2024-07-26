import React, { useState } from 'react';
import { Form, Select } from 'antd';
const { Option } = Select;

const BudgetFormRole = ({ img, name, phone, budgetrole, userRole }) => {
    const [role, setRole] = useState('admin');

    return (
        <>
            <div>
                <div className='w-full px-4'>
                    <div className='flex w-full justify-between items-center my-2'>
                        <div className='flex gap-2 items-center'>
                            <img src={img} alt="" className='w-[30px] h-[30px] object-cover rounded-[100%] border' />
                            <div>
                                <p className='text-sm'>{name}</p>
                                <p className='text-sm text-blue-500'>{phone}</p>
                            </div>
                        </div>
                        <div>
                            {role === 'admin' ? (
                                <Form
                                    initialValues={{ budgetType: budgetrole }}
                                >
                                    <Form.Item
                                        className="text-gray-400 w-[100px]"
                                        name="budgetType"
                                        rules={[
                                            {
                                                required: true,
                                                message: "",
                                            },
                                        ]}
                                    >
                                        <Select
                                            className="border-t-0 h-10 border-l-0 border-r-0 shadow-none focus:ring-0 focus:outline-none outline-none"
                                        >
                                            <Option value="admin">Admin</Option>
                                            <Option value="member">Member</Option>
                                        </Select>
                                    </Form.Item>
                                </Form>
                            ) : (
                                <p className='text-blue-500'>{budgetrole}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BudgetFormRole;
