import React, { useEffect, useState } from 'react'
import Row from '../components/Row'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader';
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.user.token)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          'https://pizza-mania-23rd.onrender.com/api/v1/customer/orders-history',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          }
        );
        const data = await response.json();
        setLoading(false)
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
        {
          loading ? (
            <>
              <Loader/>
              <p className="text-2xl font-bold text-center py-4 mt-7 text-orange-500">Wait while we are fetching your past orders list</p>
            </>
          ) : (
            <table className="w-full table-auto bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-center">Order Details</th>
                  <th className="px-4 py-2 text-center">Address</th>
                  <th className="px-4 py-2 text-center">Phone Number</th>
                  <th className="px-4 py-2 text-center">Date</th>
                  <th className="px-4 py-2 text-center">Time</th>
                  <th className="px-4 py-2 text-center">Track Order</th>
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
          )
        }
        
      </div>
    </section>
  )
}

export default Orders
