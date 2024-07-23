import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
export default function Signup() {
    const [error, setError] = useState(false);
    const [succes,setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    
    const [fullName, setFullName] = useState('ho');
    const [email, setEmail] = useState('s@gmail.com');
    const [password, setPassword] = useState('123');
    const [confirmPassword, setConfirmPassword] = useState('123');
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    async function handleRegister(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        console.log('step1')
        try {
            console.log('step1',email,password)
            setLoading(true);
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
            console.log('log user', data, error)

            if (error) throw error;

            // After successful sign-up, store the fullName
            const { data: profileData, error: updateError } = await supabase
                .from('users') // Ensure you have a 'users' table
                .insert([{ full_name: fullName, email }])
                .select();

            if (updateError) throw updateError;

            alert('Registration successful! Please check your email to confirm your account.');
        } catch (err) {
            console.log(err.message || err.error_description);
            if (err.status === 429) {
                alert('Too many requests. Please try again later.');
            } else {
                alert('Registration failed. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="bg-gray-50 h-[100vh] w-full dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="" alt="logo" />
                    Budget
                </div>
                <div className="w-full  text-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-start font-bold leading-tight tracking-tight  md:text-2xl text-white">
                            Sign Up
                        </h1>
                        <p className='text-sm text-gray-400'>Enter your detail for Sign up.</p>
                        <Form
                            onFinish={handleRegister}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                            className="row-col"
                        >
                            <Form.Item
                                className=" text-gray-400"
                                label={<span className=" text-gray-400">Username</span>}
                                name="username"

                                rules={[
                                    {
                                        required: true,
                                        message: " ",
                                    },
                                ]}
                            >
                                <Input id="username" placeholder="Username"
                                    className="w-full p-2.5"
                                />
                            </Form.Item>
                            <Form.Item
                                className=" text-white"
                                label={<span className=" text-gray-400">Email</span>}
                                name="email"

                                rules={[
                                    {
                                        required: true,
                                        message: " ",
                                    },
                                ]}
                            >
                                <Input id="email" placeholder="Email"
                                    className="w-full p-2.5"
                                />
                            </Form.Item>
                            <Form.Item
                                className=" text-gray-400"
                                label={<span className=" text-gray-400">Phone</span>}
                                name="phone"

                                rules={[
                                    {
                                        required: false,
                                        message: " ",
                                    },
                                ]}
                            >
                                <Input id="phone" placeholder="Phone"
                                    className="w-full p-2.5"
                                />
                            </Form.Item>

                            
                            <Form.Item
                                className="username"
                                label={<span className=" text-gray-400">Password</span>}
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: " ",

                                    },
                                ]}
                            >
                                <Input.Password placeholder="Password"
                                    className="w-full p-2.5"
                                />
                            </Form.Item>
                            <Form.Item
                                className="comfirmPassword"
                                label={<span className=" text-gray-400">Comfirm-Password</span>}
                                name="comfirmPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: " ",

                                    },
                                ]}
                            >
                                <Input.Password placeholder="Comfirm password"
                                    className="w-full p-2.5"
                                />
                            </Form.Item>






                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"

                                    className="w-full p-5 font-medium"
                                >
                                    Sign Up
                                </Button>
                            </Form.Item>
                            <p className="text-sm font-sm  text-gray-400">
                               already have an account?{" "}
                                <Link to="/login" className="font-medium text-blue-500">
                                    Sign In
                                </Link>
                            </p>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
}
