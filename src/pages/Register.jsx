import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    function changeHandler(event) {
        setFormData((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    async function submitHandler(event) {
        event.preventDefault();
        try {
            const toastId = toast.loading("Loading...")
            let response = await fetch('https://pizza-mania-zqoq.onrender.com/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            response = await response.json()
            toast.dismiss(toastId)
            if (response.success) {
                toast.success('User registered Successfully')
                navigate('/login')
            }
            else {
                toast.error(response.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('Error while registering the user, fill all the details properly')
        }
    }
    return (
        <section className="bg-[#F8F8F8] flex justify-center pt-24 min-h-[calc(100vh-86px)]">
            <div className="w-full max-w-xs">
                <form
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    onSubmit={submitHandler}
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            name="name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400"
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            required
                            value={formData.name}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            name="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400"
                            id="email"
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
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-gray-400"
                            id="password"
                            type="password"
                            placeholder="******************"
                            required
                            value={formData.password}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-[#FE5F1E] rounded-full text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline hover:scale-110 transition-all duration-200"
                            type="submit"
                        >
                            Register
                        </button>
                        <a
                            className="inline-block align-baseline font-bold text-sm text-[#FE5F1E] hover:scale-110 transition-all duration-200"
                            href="/login"
                        >
                            Already Registered?
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

export default Register;
