import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { supabase } from "../../services/supabaseClient";
import logo from '../../assets/images/logo.png';
import ResjisterSuccess from './ResjisterSuccess';

export default function Signup() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePopupClose = () => {
        setSuccess(false);
    };

    const triggerPopup = () => {
        setSuccess(true);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const handleRegister = async (values) => {
        setLoading(true);
        const { full_name, email, phone, password, confirmPassword } = values;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (signUpError) {
                throw signUpError;
            }

            const user = signUpData.user;

            if (!user) {
                throw new Error('User data is missing.');
            }

            // Step 2: Insert additional user data into the 'users' table
            const { data: insertData, error: insertError } = await supabase
                .from('users')
                .insert([{ id: user.id, full_name, phone }]);

            if (insertError) {
                throw insertError;
            }

            triggerPopup();
            setTimeout(() => {
                handlePopupClose();
                navigate("/login");
            }, 2000);

        } catch (err) {
            console.error(err.message || err.error_description);
            alert('Registration failed. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="bg-blue-500 lg:h-[40vh] h-[12rem]">
            {success && (
                <ResjisterSuccess
                    type="success"
                    message="Sign up successfully!"
                    duration={2000}
                    onClose={handlePopupClose}
                />
            )}

            <div className="flex w-full flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center lg:mt-[25rem] mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                    BUDGET
                </div>

                <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 bg-white mb-[4rem] space-y-4 md:space-y-6 sm:p-8 rounded-lg shadow border border-gray-200">
                        <h1 className="text-xl text-start font-bold leading-tight tracking-tight md:text-2xl">
                            Sign Up
                        </h1>
                        <p className='text-sm text-gray-400'>Enter your details to sign up.</p>
                        <Form
                            onFinish={handleRegister}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                            className="row-col"
                        >
                            <Form.Item
                                className="text-gray-400"
                                label={<span className="text-gray-400">Full name</span>}
                                name="full_name"
                                rules={[{ required: true, message: "Full name is required" }]}
                            >
                                <Input placeholder="Full name" className="w-full p-2.5" />
                            </Form.Item>
                            <Form.Item
                                className="text-white"
                                label={<span className="text-gray-400">Email</span>}
                                name="email"
                                rules={[{ required: true, message: "Email is required" }]}
                            >
                                <Input placeholder="Email" className="w-full p-2.5" />
                            </Form.Item>
                            <Form.Item
                                className="text-gray-400"
                                label={<span className="text-gray-400">Phone</span>}
                                name="phone"
                                rules={[{ required: false, message: "Phone number is optional" }]}
                            >
                                <Input placeholder="Phone" className="w-full p-2.5" />
                            </Form.Item>
                            <Form.Item
                                className="username"
                                label={<span className="text-gray-400">Password</span>}
                                name="password"
                                rules={[{ required: true, message: "Password is required" }]}
                            >
                                <Input.Password placeholder="Password" className="w-full p-2.5" />
                            </Form.Item>
                            <Form.Item
                                className="confirmPassword"
                                label={<span className="text-gray-400">Confirm Password</span>}
                                name="confirmPassword"
                                rules={[{ required: true, message: "Confirm password is required" }]}
                            >
                                <Input.Password placeholder="Confirm password" className="w-full p-2.5" />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full p-5 font-medium"
                                    loading={loading}
                                >
                                    Sign Up
                                </Button>
                            </Form.Item>
                            <p className="text-sm font-sm text-gray-400">
                                Already have an account?{" "}
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
