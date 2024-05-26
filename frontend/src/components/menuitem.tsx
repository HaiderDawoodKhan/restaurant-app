import MenuCSS from '../pages/modules/Menu.module.css'
import { RootState } from '../store/store';
import { useSelector,useDispatch } from 'react-redux'; 
import { useState } from 'react';
import { addItem, removeItem } from '../store/orderSlice';
export const MenuItemOne = (props : any) => {
    const order = useSelector((state: RootState) => state.order);
    const dispatch = useDispatch()
    const [quan, setquan] = useState(0)
    return (
                <div className={MenuCSS.item_card}>
                    <div className={MenuCSS.item_details}>
                        <h3 className={MenuCSS.item_name}>{props.name}</h3>
                        <p className={MenuCSS.item_description}>{props.description}</p>
                        <p className={MenuCSS.item_description}> Price: ${props.price}</p>
                    </div>
                    <div className={MenuCSS.item_actions}>
                        <button className={MenuCSS.btn_minus} onClick={e => {
                            if(quan-1 < 0)
                            {
                                window.alert("Item quantity cannot be negative")
                            }
                            else
                            {
                                setquan(quan - 1)
                                dispatch(removeItem({price : Number(props.price), name : props.name}))
                            }
                            }}>-</button>
                        <span className={MenuCSS.quantity}>{quan}</span>
                        <button className={MenuCSS.btn_plus} onClick={e => {
                            setquan(quan + 1)
                            dispatch(addItem({price : Number(props.price), name : props.name}))
                        }}>+</button>
                    </div>
                </div>
    )
}