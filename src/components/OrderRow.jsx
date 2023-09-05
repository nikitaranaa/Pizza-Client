import React from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
const OrderRow = ({ order,fetchOrders }) => {
    console.log(order)
    const token = useSelector((state) => state.user.token)
    const orderItems = Object.values(order.items)
    async function statusHandler(event) {
        try {
            const status = event.target.value
            const payload = {
                orderId: order._id,
                status: status
            };
            const response = await fetch(
                'https://pizza-mania-23rd.onrender.com/api/v1/admin/order/status',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload),
                }
            );
            if(status === 'completed'){
                fetchOrders()
            }
        }
        catch (error) {
            toast.error(error)
        }
    }
    return (
        <tr>
            <td className="border px-4 py-2 text-green-900">
                <div>
                    {orderItems.map((pizza,index) => (
                        <p key={index}>
                            {pizza.name} - {pizza.qty} pcs
                        </p>
                    ))}
                </div>
            </td>
            <td className="border px-4 py-2 text-center">{order.customerId.name}</td>
            <td className="border px-4 py-2 text-center">{order.address}</td>
            <td className="border px-4 py-2 text-center">{order.cutlery}</td>
            <td className="border px-4 py-2 text-center">
                <div className="inline-block relative w-64">
                    <form action="/admin/order/status" method="POST">
                        <input type="hidden" name="orderId" value={order._id} />
                        <select
                            name="status"
                            onChange={statusHandler}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="order_placed" selected={order.status === 'order_placed'}>
                                Placed
                            </option>
                            <option value="confirmed" selected={order.status === 'confirmed'}>
                                Confirmed
                            </option>
                            <option value="prepared" selected={order.status === 'prepared'}>
                                Prepared
                            </option>
                            <option value="delivered" selected={order.status === 'delivered'}>
                                Delivered
                            </option>
                            <option value="completed" selected={order.status === 'completed'}>
                                Completed
                            </option>
                        </select>
                    </form>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </td>
            <td className="border px-4 py-2">{moment(order.createdAt).format('hh:mm A')}</td>
        </tr>
    )
}

export default OrderRow
