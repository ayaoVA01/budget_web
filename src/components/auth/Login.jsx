import { useState } from "react";
import { Link } from "react-router-dom";
// import { supabase } from "../../services/supabaseClient";
import { Button, Form, Input, Switch, } from "antd";
import { useNavigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
const supabase = createClient("https://fdddlcdxwolqaqtsnkdy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZGRsY2R4d29scWFxdHNua2R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzNTI2MjgsImV4cCI6MjAzNjkyODYyOH0.5JnJXZkJuCKv5YOLpjxVU6zVnPfAsqe8ixZ80AsCQfo");
export default function Login() {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // const onFinish = (values) => {
    //     console.log("Success:", values);
    // };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const handleSubmit = async (values) => {
        // values.preventDefault();
        
        try {
            const { email, password } = values;
          
            setLoading(true);
            console.log('step3')
            const { user, error } = await supabase.auth.signInWithPassword({ email, password });
            console.log('step3')
            if (error) throw error;
            alert('Login successful!');
        } catch (err) {
            console.log('err785',err.message || err.error_description);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-gray-50 h-[100vh] w-full dark:bg-gray-900 font-fontFamily">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="" alt="logo" />
                    Budget
                </div>
                <div className="w-full  text-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-start font-bold leading-tight tracking-tight  md:text-2xl text-white">
                            Sign In
                        </h1>
                        <p className="text-sm">Enter you detail for Login website.</p>
                        <Form
                            onFinish={handleSubmit}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                            className="row-col"
                        >
                            <Form.Item
                                className=" text-gray-400"
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
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"

                                    className="w-full p-5 font-medium"
                                >
                                    Sign In
                                </Button>
                            </Form.Item>
                            <p className="text-sm font-sm text-gray-500 dark:text-gray-400">
                                Don't have an account?{" "}
                                <Link to="/" className="font-medium text-blue-500">
                                    Sign Up
                                </Link>
                            </p>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
}
