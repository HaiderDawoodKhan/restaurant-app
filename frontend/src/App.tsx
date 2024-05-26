import React from 'react';
import './App.css';
import {Route,Routes,Navigate} from 'react-router-dom'
import {Home} from './pages/Home'
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { RootState } from './store/store';
import { useSelector } from 'react-redux';
import { Menu } from './pages/Menu';
import { Profile } from './pages/Profile';
import { MyOrder } from './pages/MyOrder';
import { Orders } from './pages/Orders';
function App() {

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  const renderProtectedRoute = (Component: React.ComponentType) => {
    return isAuthenticated ? <Component /> : <Navigate to='/'/>;
  };

  return (
    <div className="App">
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path='login' element = {<Login />}/>
        <Route path='signup' element = {<Signup/>}/>
        <Route path="/home" element={renderProtectedRoute(Home)}/>
        <Route path='/menu' element={renderProtectedRoute(Menu)}/>
        <Route path='/profile' element={renderProtectedRoute(Profile)}/>
        <Route path='/order/:id' element={renderProtectedRoute(MyOrder)}/>
        <Route path='/orders' element={renderProtectedRoute(Orders)}/>
        {/* <Route path='/change/password'  element={renderProtectedRoute(ChangePassword)}/>
        <Route path='/auction/create' element= {renderProtectedRoute(CreateAuction)}/>
        <Route path='/browse' element={renderProtectedRoute(Browse)}/>
        <Route path='/auction/:id' element={renderProtectedRoute(SpecificAuction)}/> */}
      </Routes> 
    </div>
  );
}

export default App;
