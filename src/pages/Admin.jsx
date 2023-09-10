import React, { useEffect, useState } from 'react'
import OrderRow from '../components/OrderRow'
import { useSelector, useDispatch } from 'react-redux'
import {update} from '../redux/slices/AdminSlice'
import { io } from 'socket.io-client';
import { toast } from 'react-hot-toast';
const Admin = () => {
    const token = useSelector((state) => state.user.token)
    const [orders, setOrders] = useState([])
    const [payload, setPayload] = useState(0)
    const socket = io('https://pizza-mania-23rd.onrender.com')
    const dispatch = useDispatch()
    const fetchOrders = async () => {
        try {
            const response = await fetch(
                'https://pizza-mania-zqoq.onrender.com/api/v1/admin/orders',
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            const data = await response.json();
            setOrders(data.data); // Update the orders state with the fetched data
            setPayload(data.data.length)
            dispatch(update(data.data.length))
        } catch (error) {
            toast.error(error)
        }
    };
    useEffect(() => {
        fetchOrders(); // Call the fetchOrders function
        // Join the 'adminRoom'
        socket.emit('join', 'adminRoom');
        // Listen for the 'orderPlaced' event
        socket.on('orderPlaced', (data) => {
          toast.success('New order received')
          fetchOrders()
        });
    
        // Clean up the event listener when the component unmounts
        return () => {
          socket.off('orderPlaced');
        };
      }, [])
    return (
        <section className="orders light-section">
            <div className="container mx-auto pt-12">
                <table className="w-full table-auto bg-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-center">Order Details</th>
                            <th className="px-4 py-2 text-center">Customer</th>
                            <th className="px-4 py-2 text-center">Address</th>
                            <th className="px-4 py-2 text-center">Cutlery Needed</th>
                            <th className="px-4 py-2 text-center">Order Status</th>
                            <th className="px-4 py-2 text-center">Placed at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   orders.length > 0 &&
                            orders.map((order) => {
                                return <OrderRow key={order._id} order={order} fetchOrders={fetchOrders}/>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Admin
