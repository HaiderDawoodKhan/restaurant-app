import HomeCSS from '../pages/modules/Home.module.css'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store/store'
import { useSelector } from 'react-redux';
import { Navbar } from '../components/navbar';
import { useEffect, useState } from 'react';

export const Home = () => {
    
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return(
    <>
        <Navbar/>
        <div className={HomeCSS.body}>
            <div className={HomeCSS.container}>
                <div className={HomeCSS.header}>
                    <h1>Welcome to our Restaurant</h1>
                    <p>Order delicious food online or manage orders as an employee</p>
                </div>
            </div>
        </div>
    </>
    )
}