import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
const Row = ({order}) => {
  return (
            <tr>
                <td className="border px-4 py-2">
                <Link className="text-orange-500" to={`/customer/orders/${order._id}`}>{order._id}</Link>
                </td>
                <td className="border px-4 py-2">
                    {order.address}
                </td>
                <td className="border px-4 py-2">
                    {order.phone}
                </td>
                <td className="border px-4 py-2">
                    {moment(order.createdAt).format('hh:mm A') }
                </td>
            </tr>
  )
}

export default Row