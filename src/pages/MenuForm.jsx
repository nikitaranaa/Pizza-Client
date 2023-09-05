import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const MenuForm = () => {
    const token = useSelector((state) => state.user.token);
    const pizza = useSelector((state) => state.menu);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        image: null,
        size: pizza.size,
        price: pizza.price,
        name: pizza.name,
        id: pizza._id
    });

    function changeHandler(event) {
        if (event.target.name === 'image') {
            setFormData({
                ...formData,
                image: event.target.files[0],
            });
        } else {
            setFormData((prev) => {
                return {
                    ...prev,
                    [event.target.name]: event.target.value,
                };
            });
        }
    }
    let url = pizza.edit === 'No' ? 'https://pizza-mania-23rd.onrender.com/api/v1/admin/menu/add' : 'https://pizza-mania-23rd.onrender.com/api/v1/admin/menu/update'
    async function submitHandler(event) {
        event.preventDefault();
        try {
            const toastId = toast.loading("Loading...")
            const formDataToSend = new FormData();
            formDataToSend.append('image', formData.image); // Append the image correctly

            // Append other form fields to the FormData object
            formDataToSend.append('name', formData.name);
            formDataToSend.append('size', formData.size);
            formDataToSend.append('price', formData.price);
            if (pizza.edit === 'Yes') {
                formDataToSend.append('id', formData.id)
            }
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend, // Use the FormData object here
            });

            response = await response.json();
            toast.dismiss(toastId)
            if (response.success) {
                toast.success('Menu has been updated Successfully');
                navigate('/admin/menu');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <section className="bg-[#F8F8F8] flex flex-col justify-center items-center pt-4 gap-y-4 min-h-[calc(100vh-86px)]">
                <h1 className="text-3xl text-center font-extrabold">Edit Menu</h1>
                <div className="w-full max-w-xs">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler} encType="multipart/form-data">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                                Pizza Image:
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={changeHandler} // Handle file change
                                required={pizza.edit !== 'Yes'}
                            />

                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Pizza Name:
                            </label>
                            <input
                                value={formData.name}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-gray-400"
                                type="text"
                                id="name"
                                name="name"
                                onChange={changeHandler} // Handle input change
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="size">
                                Pizza Size:
                            </label>
                            <input
                                value={formData.size}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-gray-400"
                                type="text"
                                id="size"
                                name="size"
                                onChange={changeHandler} // Handle input change
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                Pizza Price:
                            </label>
                            <input
                                value={formData.price}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-gray-400"
                                type="number"
                                id="price"
                                name="price"
                                step="1"
                                onChange={changeHandler} // Handle input change
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                className="bg-[#FE5F1E] rounded-full text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline hover:scale-110 transition-all duration-200 mx-auto"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs">&copy;2022 DTU's Pizza Corner. All rights reserved.</p>
                </div>
            </section>
        </div>
    );
};

export default MenuForm;
