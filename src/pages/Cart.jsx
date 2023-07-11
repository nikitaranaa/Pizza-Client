import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import List from '../components/List'
import imageSource from '../img/empty-cart.png'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { deleteAll } from '../redux/slices/CartSlice'
const Cart = () => {
    const token = useSelector((state) => state.user.token)
    const navigate = useNavigate()
    const cart = useSelector((state) => state.cart)
    const isloggedIn = useSelector((state) => state.user.isLoggedIn) 
    const totalPrice = cart.reduce((accumulator, current) => {
        return accumulator + current.qty * current.price
    }, 0)
    const [formData, setFormData] = useState({
        phone: '',
        address: ''
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
            const payload = {
                ...formData,
                items : cart
            };
            let response = await fetch('https://pizza-mania-zqoq.onrender.com/api/v1/customer/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            response = await response.json()
            if(response.success){
                dispatch(deleteAll())
                toast.success('Order is successfully placed')
                navigate('/customer/orders')
            }
            else{
                toast.error(response.message)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section className="cart py-16">
            {
                cart.length <= 0 ? (
                    <>
                        <div className="empty-cart py-16">
                            <div className="container mx-auto text-center">
                                <h1 className="text-3xl font-bold mb-2">Cart Empty 😕 </h1>
                                <p className="text-gray-500 text-lg mb-12">You probable haven't ordered a pizza yet. <br />
                                    To order a pizza, go to the main page.
                                </p>
                                <img className="w-2/5 mx-auto" src={imageSource} alt="empty-cart" />
                                <a href="/" className="inline-block px-6 py-2 rounded-full btn-primary text-white font-bold mt-12"> Go back</a>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="order container mx-auto xl:w-1/2">
                        <div className="flex item-center border-b border-gray-300 pb-4">
                            <img src="/img/cart-black.png" alt="" />
                            <h1 className="font-bold ml-4 text-2xl">Order Summary</h1>
                        </div>
                        <div className='pizza-list'>
                            {
                                cart.map((pizza) => {
                                    return <List key={pizza._id} pizza={pizza} />
                                })
                            }
                        </div>
                        <hr />
                        <div className="text-right py-4">
                            <div>
                                <span className="text-lg font-bold">Total Amount:</span>
                                <span className="amount text-2xl font-bold ml-2">₹{cart.length > 0 ? totalPrice : 0}</span>
                            </div>
                            {
                                isloggedIn ? (
                                    <div>
                                        <form className='flex justify-center items-center' onSubmit={submitHandler}>
                                            <div className='flex flex-col gap-2 min-w-full'>
                                                <input className='border border-gray-400 p-2 w-1/2 mb-4'
                                                    required
                                                    placeholder='Enter your Phone Number'
                                                    value={formData.phone}
                                                    name='phone'
                                                    onChange={changeHandler}
                                                ></input>
                                                <input className='border border-gray-400 p-2 w-1/2 mb-4'
                                                    required
                                                    placeholder='Enter your address'
                                                    value={formData.address}
                                                    name='address'
                                                    onChange={changeHandler}
                                                ></input>
                                                <button className="px-6 py-2 rounded-full text-white font-bold bg-orange-500 w-1/2" type="submit">Order Now</button>
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    <Link to='/login' className="inline-block cursor-pointer px-4 py-2 rounded-full text-white font-bold mt-4 bg-orange-500">Login to Continue</Link>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </section>
    )
}

export default Cart