import { RootState } from '../store/store';
import { useSelector,useDispatch } from 'react-redux';
import ProfileCSS from '../pages/modules/Profile.module.css'
import { Link } from 'react-router-dom';
import userAsset from '../assets/user.png'
import { Navbar } from '../components/navbar'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SingleOrder } from '../components/order';
import { Order } from '../components/types/Order.types';

export const Profile = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const id = user ? user._id : ""
    const [orders, setorders] = useState<string[]>([])
    const dispatch = useDispatch()
    const role = user ? user.role : ""
    const isCustomer = (role : string) =>
    {
        if(role == "Customer")
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    async function getOrders(id : string)
    {
        try {
            const res = await axios.get(`http://localhost:8000/order/get/${id}`)
            console.log(res.data)
            setorders(res.data)
        } catch (error) {
            window.alert(error)
        }
    }
    useEffect(() => {
      if(id)
      {
        getOrders(id)
      }
    }, [])
    
    return (
           
            <div className={ProfileCSS.body}>
            <Navbar/>
                <div className={ProfileCSS.container}>
                    <div className={ProfileCSS.profile}>
                        <h2>Profile</h2>
                        <div className={ProfileCSS.profile_details}>
                            <p><strong>Name:</strong> {user?.name}</p>
                            <p><strong>Username:</strong> {user?.username}</p>
                        </div>
                        {isCustomer(role) && <h3>My Orders</h3>}
                        <div className={ProfileCSS.orders}>
                            {isCustomer(role) && orders.map(order => <SingleOrder key={order} id={order}/>)}
                        </div>
                    </div>
                </div>
            </div>
    )
}