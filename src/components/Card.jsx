import React from 'react'
import {AiFillEdit} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'
import { useSelector } from 'react-redux'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {add} from '../redux/slices/MenuSlice'
const Card = ({pizza, fetchPizzas}) => {
    console.log(pizza)
    const payload = {
        id : pizza._id
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector((state) => state.user.token)
    const deletehandler = async() => {
        try{
            let response = await fetch('https://pizza-mania-23rd.onrender.com/api/v1/admin/menu/delete',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                }
            )
            response = await response.json()
            if(response.success){
                toast.success('Pizza removed Successfully')
                fetchPizzas()
            }
        }
        catch(error){
            console.log(error)
        }
    }
    const updatehandler = async() => {
        dispatch(add({...pizza, edit : 'Yes'}))
        navigate('/admin/menu/edit')
    }
  return (
    <div className="w-full md:w-64 px-10 py-10">
            <img className="h-40 mb-4 mx-auto" src={pizza.image} alt="" />
            <div className="text-center">
                <h2 className="mb-4 text-lg">{pizza.name}</h2>
                <span className="size py-1 px-4 rounded-full uppercase text-xs">{pizza.size}</span>
                <div className="flex items-center justify-around mt-6">
                    <button className="bg-orange-500 py-1 px-4 rounded-full flex items-center font-bold gap-4 text-lg" onClick={updatehandler}><AiFillEdit className='text-white'/></button>
                    <span className="font-bold text-lg">₹{pizza.price}</span>
                    <button className="bg-orange-500 py-1 px-4 rounded-full flex items-center font-bold gap-4 text-lg" onClick={deletehandler}><AiFillDelete className='text-white'/></button>
                </div>
            </div>
        </div>
  )
}

export default Card