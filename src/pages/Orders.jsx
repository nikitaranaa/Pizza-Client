import React, { useEffect, useState } from 'react'
import Row from '../components/Row'
import { useSelector } from 'react-redux'
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.user.token)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          'https://pizza-mania-zqoq.onrender.com/api/v1/customer/orders-history',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          }
        );
        const data = await response.json();
        const result = data.data
        setOrders(result); // Update the orders state with the fetched data
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);
  return (
    <section className="orders light-section">
      <div className="container mx-auto pt-12">
        <h1 className="font-bold text-lg mb-4">All orders</h1>
        <table className="w-full table-auto bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Orders</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Phone Number</th>
              <th className="px-4 py-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.length > 0 ? (
                <>
                  {
                    orders.map((order) => {
                      return <Row key={order._id} order={order} />
                    })
                  }
                </>
              ) : (
                <tr>
                  <td className="p-4"><span>No orders found</span></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Orders