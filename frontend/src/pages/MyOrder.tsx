import { useParams } from 'react-router-dom'
import MyOrderCSS from './modules/MyOrder.module.css'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { Order } from '../components/types/Order.types'
import { Navbar } from '../components/navbar'
import { io, Socket } from 'socket.io-client';

export const MyOrder = () =>{
    const { id } = useParams();
    const [singleOrder, setsingleOrder] = useState<Order>()
    const [socket, setSocket] = useState<Socket | null>(null)
    const [status, setstatus] = useState("")

    async function fetchOrder() 
        {
        try {
            const res = await axios.get(`http://localhost:8000/order/${id}`)
            console.log(res.data.order)
            setsingleOrder(res.data.order)
            setstatus(res.data.order.status)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const newSocket = io("http://localhost:8000");
        setSocket(newSocket);
        newSocket.emit("on-order",id)
        newSocket.on('updated-status',(ids,choice)=>{
            console.log(ids)
            console.log(id)
            if(ids == id) {
                setstatus(choice);
            }
        })
        return () => {newSocket.disconnect()}
        
    },[])

    const returnIndex = (arr1 : string[], item : string) => {
        for(let i = 0; i < arr1.length;i++)
        {
            if(item == arr1[i])
            {
                return i;
            }
        }   
        return 0;
    }

    useEffect(() => {
        fetchOrder()
    }, []); 
    
    return (
        <div className={MyOrderCSS.body}>
            <Navbar/>
        <div className={MyOrderCSS.container}>
        <div className={MyOrderCSS.card}>
            <h2>My Order</h2>
            <div className={MyOrderCSS.order_details}>
                <div className={MyOrderCSS.item}>
                    {/* <span className={MyOrderCSS.name}>Burger</span>
                    <span className={MyOrderCSS.quantity}>x2</span>
                    <span className={MyOrderCSS.price}>$10.00</span> */}
                    {singleOrder?.items_ordered.map(item => <span key={item}><span className={MyOrderCSS.name}>{item}</span> x <span className={MyOrderCSS.quantity}>{Number(singleOrder?.quantity_ordered[returnIndex(singleOrder?.items_ordered,item)])}</span></span>)}
                </div>
                <div className={MyOrderCSS.total}>
                    <span>Total:</span>
                    <span className={MyOrderCSS.total_price}>${Number(singleOrder?.total_price)}</span>
                </div>
                <div className={MyOrderCSS.status}>
                    <span>Status:</span>
                    <span className={MyOrderCSS.order_status}>{status}</span>
                </div>
            </div>
        </div>
        </div>
        </div>
        
    )
}
