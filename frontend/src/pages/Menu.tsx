import MenuCSS from './modules/Menu.module.css'
import { MenuItem } from '../components/types/MenuItem.types'
import { useEffect, useState } from 'react'
import { Navbar } from '../components/navbar'
import axios from 'axios'
import { MenuItemOne } from '../components/menuitem'
import { RootState } from '../store/store';
import { useSelector,useDispatch } from 'react-redux';
import { resetState } from '../store/orderSlice'
import { io, Socket } from 'socket.io-client';


export const Menu = () => {
    const [menuitems, setMenuitems] = useState<MenuItem[]>([])
    const order = useSelector((state: RootState) => state.order);
    const [socket, setSocket] = useState<Socket | null>(null)

    const user = useSelector((state: RootState) => state.auth.user)

    useEffect(() => {
        const newSocket = io("http://localhost:8000");
        setSocket(newSocket);
        return () => {newSocket.disconnect()}
    },[])
    const dispatch = useDispatch()
    
    useEffect(() => {
        fetchAllMenuItems();

    }, [])
    let temp : MenuItem = {
        _id : "gfe",
        item_name : "reg",
        description : "",
        price : 10,
    }
    const fetchAllMenuItems = async () => {
        const res = await axios.post("http://localhost:8000/menu/getAll")
        const array: MenuItem[] = res.data.menu_items
        setMenuitems([...array])

    }
    useEffect(()=>{
        dispatch(resetState())
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
    async function handleCheckout(e : any)
    {
        e.preventDefault()
        if(Number(order.total_price) <= 0 || order.items_ordered.length == 0 || order.quantity_ordered.length == 0)
        {
            window.alert("You cannot place an empty order")
            return;
        }
        try {
            const res = await axios.post("http://localhost:8000/order/create",{
            items_ordered : order.items_ordered,
            quantity_ordered : order.quantity_ordered,
            status : "Processing",
            total_price : order.total_price,
            ordered_by : user?._id
        })
            socket?.emit("order-placed",res)
            window.alert("Order placed")
            dispatch(resetState())
        } catch (error) {
            window.alert("error while placing order")
        }
        
    }
return (
    <>
        <Navbar />
        <div className={MenuCSS.body}>
            <div className={MenuCSS.container}>
                <h2>Menu</h2>
                <div className={MenuCSS.menu_items}>
                    {menuitems.map(menu => <MenuItemOne key={menu._id} name={menu.item_name} description={menu.description} price={menu.price}/>)}
                </div>

                <div className={MenuCSS.cart}>
                    <h3>Shopping Cart</h3>
                    <ul className={MenuCSS.cart_items}>
                        {order.items_ordered.map(item => <li key={item}>{item} x {Number(order.quantity_ordered[returnIndex(order.items_ordered,item)])}</li>)}
                    </ul>
                    <p>Total Price: ${Number(order.total_price)}</p>
                    <button className={MenuCSS.btn_checkout} onClick={handleCheckout}>Checkout</button>
                </div>
            </div>
        </div>
    </>
)
}