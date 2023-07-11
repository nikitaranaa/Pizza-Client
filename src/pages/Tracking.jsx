import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { toast } from 'react-hot-toast'
const Tracking = () => {
    const token = useSelector((state) => state.user.token)
    const [order, setOrder] = useState({
        _id: ''
    })
    const [status, setStatus] = useState('order_placed')
    const updateStatus = (order_status) => {
        const statuses = document.querySelectorAll('.status_line');
        statuses.forEach((status) => {
            status.classList.remove('step-completed');
            status.classList.remove('current');
        });
        let stepCompleted = true;
        statuses.forEach((status) => {
            const dataProp = status.getAttribute('data-status');
            if (stepCompleted) {
                status.classList.add('step-completed');
            }
            if (dataProp === order_status) {
                stepCompleted = false;
                if (status.nextElementSibling) {
                    status.nextElementSibling.classList.add('current');
                }
            }
        });
    };
    useEffect(() => {
        updateStatus(status)
    },[status])
    const socket = io('https://pizza-mania-zqoq.onrender.com')
    const { id } = useParams()
    const fetchOrder = async () => {
        try {
            const response = await fetch(
                `https://pizza-mania-zqoq.onrender.com/api/v1/customer/${id}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            const data = await response.json();
            setOrder(data.data); // Update the orders state with the fetched data
            setStatus(data.data.status)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchOrder(); // Call the fetchOrders function
        socket.emit('join', `order_${id}`)
        socket.on('orderUpdated', (data) => {
            toast.success('Order Status updated')
            setStatus(data.status)
        })
        return () => {
            socket.off('orderUpdated');
        }
    }, [])
    return (
        <div>
            <section className="status">
                <div className="container mx-auto">
                    <div className="status-box w-full lg:w-2/3 mx-auto">
                        <div className="flex items-center justify-between mb-12">
                            <h1 className="text-xl font-bold">Track Delivery Status</h1>
                            <h6 className="bg-white py-1 rounded-full px-4 text-green-600 text-xs">{order._id}</h6>
                            <input id="hiddenInput" type="hidden" value={JSON.stringify(order)} />
                        </div>
                        <ul>
                            <li class="status_line textsm md:text-xl pb-16" data-status="order_placed"><span>Order Placed</span></li>
                            <li class="status_line textsm md:text-xl pb-16" data-status="confirmed"><span>Order Confirmation</span></li>
                            <li class="status_line textsm md:text-xl pb-16" data-status="prepared"><span>Preparation</span></li>
                            <li class="status_line textsm md:text-xl pb-16" data-status="delivered"><span>Out for Delivery</span></li>
                            <li class="status_line textsm md:text-xl" data-status="completed"><span>Completed</span></li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Tracking