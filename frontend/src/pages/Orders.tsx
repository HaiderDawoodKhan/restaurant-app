import { useParams } from 'react-router-dom'
import OrderCSS from './modules/Orders.module.css'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { Order } from '../components/types/Order.types'
import { Navbar } from '../components/navbar'
import { io, Socket } from 'socket.io-client';
import { EmployeeOrder } from '../components/employeeorder'
export const Orders = () => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [currentOrders, setcurrentOrders] = useState<Order[]>([])
    async function fetchOrder() 
        {
        try {
            const res = await axios.post(`http://localhost:8000/order/currentOrders`)
            console.log(res.data.orders)
            setcurrentOrders(res.data.orders)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const newSocket = io("http://localhost:8000");
        setSocket(newSocket);
        return () => {newSocket.disconnect()}
        
},[])
    useEffect(()=>{
        fetchOrder()
    },[])


    return (
        <div>
            <Navbar/>
             <div className={OrderCSS.body}>
                <div className={OrderCSS.container}>
                    <h2>Orders</h2>
                    <div className={OrderCSS.orders}>
                        {currentOrders.map(order => <EmployeeOrder id={order._id}/>)}
                    </div>
                </div>
            </div>
        </div>
       
    )
}