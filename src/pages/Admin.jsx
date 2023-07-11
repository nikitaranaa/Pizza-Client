import React, { useEffect, useState } from 'react'
import OrderRow from '../components/OrderRow'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client';
import { toast } from 'react-hot-toast';
const Admin = () => {
    const token = useSelector((state) => state.user.token)
    const [orders, setOrders] = useState([])
    const socket = io('https://pizza-mania-zqoq.onrender.com')
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
          setOrders((prevOrders) => [data, ...prevOrders]);
        });
    
        // Clean up the event listener when the component unmounts
        return () => {
          socket.off('orderPlaced');
        };
      }, [])
    return (
        <section className="orders light-section">
            <div className="container mx-auto pt-12">
                <h1 className="font-bold text-lg mb-4">All orders</h1>
                <table className="w-full table-auto bg-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">Orders</th>
                            <th className="px-4 py-2 text-left">Customer</th>
                            <th className="px-4 py-2 text-left">Address</th>
                            <th className="px-4 py-2 text-left">status</th>
                            <th className="px-4 py-2 text-left">Placed at</th>
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