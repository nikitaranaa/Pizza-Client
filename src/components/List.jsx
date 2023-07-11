import React from 'react'
import imageSource from '../img/pizza.png'
export const List = ({pizza}) => {
    return (
        <div className="flex items-center my-8">
            <img className="w-24" src={imageSource} alt=""/>
                <div className="flex-1 ml-4">
                    <h1>{pizza.name}</h1>
                    <span>{pizza.size}</span>
                </div>
                <span className="flex-1">{pizza.qty}</span>
                <span className="font-bold text-lg">₹{pizza.price * pizza.qty}</span>
        </div>
    )
}

export default List
