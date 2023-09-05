import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
const Row = ({ order }) => {
    return (
        <tr>
            <td className="border px-4 py-2 text-center text-green-900">
                <div>
                    {order?.items.map((pizza, index) => (
                        <p key={index}>
                            {pizza.name} - {pizza.qty} pcs
                        </p>
                    ))}
                </div>
            </td>
            <td className="border px-4 py-2 text-center">
                {order.address}
            </td>
            <td className="border px-4 py-2 text-center">
                {order.phone}
            </td>
            <td className="border px-4 py-2 text-center">
                {moment(order.createdAt).format('DD-MM-YYYY')}
            </td>
            <td className="border px-4 py-2 text-center">
                {moment(order.createdAt).format('hh:mm A')}
            </td>
            <td className="border px-4 py-2 text-center">
                <Link to={`/customer/orders/${order._id}`} className="inline-block cursor-pointer px-4 py-2 rounded-full text-white font-bold mt-4 bg-orange-500">Track my Order</Link>
            </td>
        </tr>
    )
}

export default Row
