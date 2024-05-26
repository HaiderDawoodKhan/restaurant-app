import NavbarCSS from '../components/modules/navbar.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store/store'
import { useSelector } from 'react-redux';

export const Navbar = () => {
    
    const dispatch = useDispatch();

    function handleLogout() 
    {
        dispatch(logout());
    }

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const examUser = useSelector((state: RootState) => state.auth.user);
    const role = examUser ? examUser.role : ""
    const navigate = useNavigate()
    const isEmployee = (role : string) =>
    {
        if(role == "Employee")
        {
            return true;
        }
        else
        {
            return false;
        }
            
    }
    return(
        <div className={NavbarCSS.body}>
            <div>
                <ul className={NavbarCSS.container}>
                    <span className={NavbarCSS.sub_container}>
                        {isAuthenticated && <li ><Link className={NavbarCSS.link} to='/home'>Home</Link></li>}
                        {isAuthenticated && <li ><Link className={NavbarCSS.link} to='/menu'>Menu</Link></li>}
                        {isAuthenticated && isEmployee(role) && <li ><Link className={NavbarCSS.link} to='/orders'>Orders</Link></li>}
                        {/* {isAuthenticated &&  <li ><Link to='/orders'>Orders</Link></li>} */}
                    </span>
                    <span className={NavbarCSS.sub_container}> 
                        {isAuthenticated && <li><Link className={NavbarCSS.link} to='/profile'>Profile</Link></li>}
                        {isAuthenticated && <li className={NavbarCSS.logout} onClick={handleLogout}>Logout</li>}
                        {/* <li>className</li> */}
                        {!isAuthenticated && <li><Link className={NavbarCSS.link} to='/signup'>Signup</Link></li>}
                        {!isAuthenticated && <li><Link className={NavbarCSS.link} to='/login'>Login</Link></li>}
                    </span>
                </ul>
            </div>
        </div>
    )
}