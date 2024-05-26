import styles from './modules/employeeorder.module.css'
import { Order } from './types/Order.types'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { Socket,io } from 'socket.io-client'

export const EmployeeOrder = (props : any) => {

    const [socket, setSocket] = useState<Socket | null>(null);
    const [singleOrder, setsingleOrder] = useState<Order>()
    const [choice, setchoice] = useState("")
    const [updatedstatus, setupdatedstatus] = useState("")
    const [id, setid] = useState("")
    async function fetchOrder() 
    {
        try {
            const res = await axios.get(`http://localhost:8000/order/${props.id}`)
            console.log(res.data.order)
            setsingleOrder(res.data.order)
            setid(res.data.order._id)
            setupdatedstatus(res.data.order.status)
            console.log(res.data.order._id)
        } catch (error) {
            console.log(error)
        }
       
    }
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

    useEffect(()=>{
        fetchOrder()
    },[])

    useEffect(() => {
        const newSocket = io("http://localhost:8000");
        setSocket(newSocket);
        return () => {newSocket.disconnect()}
        
    },[])

    async function handleClick() {
        socket?.emit("status-change",id, choice)
        setupdatedstatus(choice)
    }

    async function handleChange(e:any)
    {
        setchoice(e.target.value)
    }
    return (
    <div className={styles.order_card}>
    <div className={styles.order_details}>
        <p><strong>Items:</strong></p>
        {singleOrder?.items_ordered.map(item => <p key={item}>{item} x {Number(singleOrder?.quantity_ordered[returnIndex(singleOrder?.items_ordered,item)])}</p>)}
        <p><strong>Total Price:</strong> {Number(singleOrder?.total_price)}</p>
        <p><strong>Status:</strong> {updatedstatus}</p>
    </div>
    <div className={styles.update_status}>
        <select value={choice} onChange={handleChange}>
            <option value="Processing">Processing</option>
            <option value="Preparing">Preparing</option>
            <option value="Ready">Ready</option>
            <option value="Delivered">Delivered</option>
        </select>
        <button onClick={handleClick}>Update Status</button>
    </div>
</div>)
}