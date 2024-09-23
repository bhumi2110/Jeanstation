import React from 'react';

import './NavBar.css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
const navigate=useNavigate();
const handlesignup=()=>{
  navigate('/signup')
}
const handlesignin=()=>{
  navigate('/signin')
}
const handlelogout=()=>{
  navigate('/logout')
}

  

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          JEANS STATION
        </div>
        <div className="navbar-buttons">
          <button className="nav-button" onClick={handlesignin}>Sign In</button>
          <button className="nav-button"onClick={handlesignup} >SignUp</button>
          <button className="nav-button"onClick={handlelogout} >LogOut</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;



