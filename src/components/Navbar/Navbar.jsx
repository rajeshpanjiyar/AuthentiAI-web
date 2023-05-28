import React, { useState } from 'react';
import './Navbar.scss';

const Navbar = () => {
    const [user, setUser] = useState("Test User");
    const showUserDetails = () => {
        alert("User Details");
    }
    return (
      <div className='navbar'>
        <div className='navbar__left'>
        </div>
        <div className='navbar__right'>
            <div onClick = {showUserDetails}>{user}</div>
            <img src="profile.png" class="user" alt="User Profile" onClick = {showUserDetails} />
        </div>
      </div>
    )
}

export default Navbar