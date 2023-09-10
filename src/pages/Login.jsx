import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {login} from '../redux/slices/UserSlice'
const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    function changeHandler(event) {
        setFormData((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }
    const dispatch = useDispatch()
    async function submitHandler(event) {
        event.preventDefault();
        try {
            const toastId = toast.loading("Loading...")
            let response = await fetch('https://pizza-mania-zqoq.onrender.com/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });
            response = await response.json()
            toast.dismiss(toastId)
            if (response.success) {
                const token = response.token
                const role = response.userDetails.role
                const payload = {
                    token,
                    role
                }
                dispatch(login(payload))
                toast.success('User Logged in successfully')
                if(role === 'admin') {
                    navigate('/admin/orders')
                }
                else {
                    navigate('/')
                }
            }
            else {
                const error = response.message
                toast.error(error)
            }
        } catch (error) {
            console.log(error);
            toast.error('Error while logging in user! Fill all the details properly')
        }
    }

    return (
        <section className="bg-[#F8F8F8] flex justify-center pt-24 min-h-[calc(100vh-86px)]">
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Email
                        </label>
                        <input
                            name="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400"
                            id="username"
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={formData.email}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            name="password"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-gray-400"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={formData.password}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-[#FE5F1E] rounded-full text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline  hover:scale-110 transition-all duration-200"
                            type="submit"
                        >
                            Log In
                        </button>
                        <a
                            className="inline-block align-baseline font-bold text-sm text-[#FE5F1E]  hover:scale-110 transition-all duration-200"
                            href="/register"
                        >
                            Don't have an account?
                        </a>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2022 Chirag's Pizza Corner. All rights reserved.
                </p>
            </div>
        </section>
    );
};

export default Login;
