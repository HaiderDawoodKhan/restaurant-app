import SignupCSS from '../pages/modules/Signup.module.css'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';

export const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch();

    async function handleSubmit(e : any)
    {
        e.preventDefault();
        if(!username || !password || !repassword || !name)
        {
            window.alert("Please fill in the fields!")
            setUsername("")
            setPassword("")
            setRepassword("")
            return;
        }
        
        if(repassword != password)
        {
            window.alert("Passwords not match! Try again")
            setUsername("")
            setPassword("")
            setRepassword("")
            return;
        }
        try {
            const res = await axios.post("http://localhost:8000/user/create",{name,username,password})
            
            dispatch(dispatch(loginSuccess({ 
                _id : res.data.user._id,
                name : res.data.user.name,
                username : res.data.user.username, 
                role : res.data.user.role,
                created_orders : res.data.created_orders
            })));
            navigate('/home')
            
        } catch (error) {
            window.alert("Username is already taken...")
            setUsername("")
            setPassword("")
            setRepassword("")
            console.log(error)
        }
    }
    return(
        <div className={SignupCSS.body}> 
        <div className={SignupCSS.signupContainer}>
                <form className={SignupCSS.login_form}>
                    <h2>Signup</h2>
                    <div className={SignupCSS.form_group}>
                        <label htmlFor="name">Name</label>
                        <input type="text" value = {name} id="name" name="name" placeholder="Enter your name" onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className={SignupCSS.form_group}>
                        <label htmlFor="username">Username</label>
                        <input type="text" value = {username} id="username" name="username" placeholder="Enter your username" onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className={SignupCSS.form_group}>
                        <label htmlFor="password">Password</label>
                        <input type="password" value = {password} id="password" name="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className={SignupCSS.form_group}>
                        <label htmlFor="confirmpassword">Confirm Password</label>
                        <input type="password" value = {repassword} id="confirmpassword" name="password" placeholder="Re-enter your password" onChange={e => setRepassword(e.target.value)}/>
                    </div>
                    <div className={SignupCSS.form_group}>
                        <button type="submit" onClick={handleSubmit}>Sign Up</button>
                    </div>
                    <div className={`${SignupCSS.form_group} ${SignupCSS.signup_link}`}>
                        Already have an account? <Link className={SignupCSS.link} to="/login">Login</Link>
                    </div>
                </form>
            </div>
            </div>
    )
    
}