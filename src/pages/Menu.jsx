import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import Card from '../components/Card'
import {AiOutlinePlus} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { update } from '../redux/slices/MenuSlice'
import { useNavigate } from 'react-router-dom'
const Menu = () => {
    const [pizzas, setPizzas] = useState([])
    const [loader, setLoader] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fetchPizzas = async () => {
        try {
            setLoader(true)
            const response = await fetch('https://pizza-mania-23rd.onrender.com/api/v1/auth');
            const data = await response.json();
            setPizzas(data.pizzas)
            setLoader(false)
        } catch (error) {
            console.error('Error fetching pizzas:', error);
        }
    }
    useEffect(() => {
        fetchPizzas()
    }, [])
    const clickHandler = () => {
        dispatch(update())
        navigate('/admin/menu/edit')
    }
    return (
        <div>
        <div className='flex justify-center items-center gap-x-4'>
            <h1 className='text-3xl font-extrabold text-center'>Menu</h1>
            <button className='flex justify-center items-center bg-green-500 rounded-full px-3 py-1' onClick={clickHandler}><AiOutlinePlus/>{' '} Add New</button>
        </div>
            {
                loader ? (
                    <>
                        <Loader />
                        <p className="text-2xl font-bold text-center py-4 mt-7 text-orange-500">Admin Menu Hub: Where Flavors Come to Life</p>
                    </>
                ) :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-16">
                        {pizzas.map((pizza) => {
                            return <Card key={pizza._id} pizza={pizza} fetchPizzas={fetchPizzas}/>
                        })}
                    </div>
            }
        </div>
    )
}

export default Menu