import React from 'react'
import imageSource from '../img/pizza.png'
import { add, remove, update } from '../redux/slices/CartSlice'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
const Menu = ({ pizza }) => {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    // Find the pizza in the cart by id
    let order = cart.find((item) => item._id === pizza._id)
    const addToCart = () => {
        if (!order) {
            // If pizza not in cart, add with quantity 1
            const newOrder = {
                ...pizza,
                qty: 1
            }
            dispatch(add(newOrder))
            toast.success('Item Added to the Cart')
        } else {
            // If pizza already in cart, increase quantity by 1
            const updatedOrder = {
                ...order,
                qty: order.qty + 1
            }
            dispatch(update(updatedOrder))
            toast.success('Item Added to the Cart')
        }
    }

    const removeFromCart = () => {
        if (order && order.qty > 0) {
            // Decrease quantity by 1 if pizza in cart and quantity is greater than 0
            const updatedOrder = {
                ...order,
                qty: order.qty - 1
            }
            order = updatedOrder
            dispatch(update(updatedOrder))
            toast.error('Item Removed from the Cart')
        }
        if(order.qty === 0){
            dispatch(remove(pizza))
        }
    }
    return (
        <div className="w-full md:w-64">
            <img className="h-40 mb-4 mx-auto" src={imageSource} alt="" />
            <div className="text-center">
                <h2 className="mb-4 text-lg">{pizza.name}</h2>
                <span className="size py-1 px-4 rounded-full uppercase text-xs">{pizza.size}</span>
                <div className="flex items-center justify-around mt-6">
                    <span className="font-bold text-lg">₹{pizza.price}</span>
                    <div className="bg-orange-500 py-1 px-6 rounded-full flex items-center font-bold gap-4 text-lg">
                        <button onClick={removeFromCart}>-</button>
                        <span>|</span>
                        <button onClick={addToCart}>+</button>
                    </div>
                    <div className="bg-green-500 py-1 px-3 rounded-full flex items-center font-bold gap-4">
                        <p>Qty</p>
                        <p>{order ? order.qty : 0}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu
