import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { deleteAll } from '../redux/slices/CartSlice'
import { useDispatch, useSelector } from 'react-redux'
const Details = () => {
    const cart = useSelector((state) => state.cart)
    const totalPrice = cart.reduce((accumulator, current) => {
        return accumulator + current.qty * current.price
    }, 0)
    const token = useSelector((state) => state.user.token)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        payment: 'PayOnline',
        cutlery: 'No'
    })
    function changeHandler(event) {
        setFormData((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script")
            script.src = src
            script.onload = () => {
            resolve(true)
            }
            script.onerror = () => {
            resolve(false)
            }
            document.body.appendChild(script)
        })
    }
    const dispatch = useDispatch()
    async function verifyPayment(bodyData, token) {
        try {
            let response = await fetch('https://pizza-mania-23rd.onrender.com/api/v1/customer/orders/paymentVerification',{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bodyData)
            })
            response = await response.json()
            console.log(response)
            if (!response.success) {
            throw new Error(response.message)
            }
            const id = response.orderDetails._id
            console.log(response)
            dispatch(deleteAll())
            toast.success('Order is successfully placed')
            navigate(`/customer/orders/${id}`)
        } catch (error) {
            console.log("PAYMENT VERIFY ERROR............", error)
            toast.error("Could Not Verify Payment.")
        }
    }
    async function submitHandler(event) {
        event.preventDefault();
            const payload = {
                ...formData,
                items: cart
            }
            let response
            const toastId = toast.loading("Loading...")
            if(formData.payment === 'PayOnline'){
                try{
                    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
                    if (!res) {
                        toast.error(
                        "Razorpay SDK failed to load. Check your Internet Connection."
                        )
                        return
                    }
                    response = await fetch('https://pizza-mania-23rd.onrender.com/api/v1/customer/orders/online',{
                        method : 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({totalPrice})
                    })
                    response = await response.json()
                    if (!response.success) {
                        throw new Error(response.message)
                    }
                    const options = {
                        key: process.env.RAZORPAY_KEY,
                        currency: response.message.currency,
                        amount: `${response.message.amount}`,
                        order_id:response.message.id,
                        name:"DTU's Pizza Corner",
                        description: "Thank You for Placing the Order",
                        handler: function(response) {
                            verifyPayment({...response, payload}, token);
                        }
                    }
                    toast.dismiss(toastId)
                    const paymentObject = new window.Razorpay(options)
                    paymentObject.open()
                    paymentObject.on("payment.failed", function (response) {
                    toast.error("Oops! Payment Failed.")
                    console.log(response.error)
                    })
                }
                catch(error){
                    console.log(error)
                    toast.error("Could Not make Payment.")
                }
            }
            else{
                try{
                    response = await fetch('https://pizza-mania-23rd.onrender.com/api/v1/customer/orders', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(payload)
                    });

                    response = await response.json()
                    toast.dismiss(toastId)
                    if (response.success) {
                        const id = response.orderDetails._id
                        console.log(response)
                        dispatch(deleteAll())
                        toast.success('Order is successfully placed')
                        navigate(`/customer/orders/${id}`)
                    }
                    else {
                        toast.error(response.message)
                    }
                }
                catch(error){
                    toast.error('Something went wrong')
                }
            }
    }
    return (
        <section className="bg-[#F8F8F8] flex justify-center pt-16 min-h-[calc(100vh-86px)]">
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="phoneNumber"
                        >
                            Phone Number
                        </label>
                        <input
                            name="phone"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400"
                            id="phoneNumber"
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength="10"
                            placeholder="Enter your Contact Number"
                            required
                            value={formData.phone}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="address"
                        >
                            Address
                        </label>
                        <textarea
                            name="address"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400"
                            id="address"
                            placeholder="Enter your address"
                            rows="4"
                            maxLength="200"
                            required
                            value={formData.address}
                            onChange={changeHandler}
                        />
                    </div>
                    <label className="flex text-gray-700 text-sm font-bold mb-2">
                        Mode of Payment
                    </label>
                    <div className='flex justify-between mb-4'>
                        <div className="flex items-center">
                            <input
                                name="payment"
                                className="mr-2 leading-tight"
                                type="checkbox"
                                value="COD" 
                                checked={formData.payment === "COD"} 
                                onChange={changeHandler}
                            />
                            <span className="text-gray-700">Cash on Delivery</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                name="payment"
                                className="mr-2 leading-tight"
                                type="checkbox"
                                value="PayOnline" 
                                checked={formData.payment === "PayOnline"}
                                onChange={changeHandler}
                            />
                            <span className="text-gray-700">Pay Online</span>
                        </div>
                    </div>
                    <div>
                        <label className="flex text-gray-700 text-sm font-bold mb-2">
                            Need Cutlery ?
                        </label>
                        <div className='flex justify-between mb-4 pr-[56px]'>
                            <div>
                                <input
                                    name="cutlery"
                                    className="mr-2 leading-tight"
                                    type="checkbox"
                                    value="Yes" 
                                    checked={formData.cutlery === "Yes"} 
                                    onChange={changeHandler}
                                />
                                <span className="text-gray-700">Yes</span>
                            </div>
                            <div>
                                <input
                                    name="cutlery"
                                    className="mr-2 leading-tight"
                                    type="checkbox"
                                    value="No" 
                                    checked={formData.cutlery === "No"}
                                    onChange={changeHandler}
                                />
                                <span className="text-gray-700">No</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-[#FE5F1E] rounded-full text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline  hover:scale-110 transition-all duration-200 mx-auto"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2022 DTU's Pizza Corner. All rights reserved.
                </p>
            </div>
        </section>
    )
}

export default Details