import LoginCSS from '../pages/modules/Login.module.css'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import axios from 'axios';

export const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    async function handleSubmit(e : any)
    {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/user/login",{username,password})
            if(res.data.found)
            {
                dispatch(loginSuccess({ 
                    _id : res.data.user._id,
                    name : res.data.user.name,
                    username : res.data.user.username, 
                    role : res.data.user.role,
                    created_orders : res.data.created_orders
                }));
                navigate('/home')
            }
            
        } catch (error) {
            window.alert("Invalid credentials")
            setUsername("")
            setPassword("")
            console.log(error)
        }
    }

    return (
        <div className={LoginCSS.body}>
        <div className={LoginCSS.container}>
            <form className={LoginCSS.login_form}>
                <h2>Login</h2>
                <div className={LoginCSS.form_group}>
                    <label htmlFor="username">Username</label>
                    <input type="text" value = {username} id="username" name="username" placeholder="Enter your username" onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className={LoginCSS.form_group}>
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} id="password" name="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className={LoginCSS.form_group}>
                    <button className = {LoginCSS.loginButton} type="submit" onClick={handleSubmit}>Login</button>
                </div>
                <div className={`${LoginCSS.form_group} ${LoginCSS.signup_link}`}>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </form>
        </div>
        </div>
    )
}


