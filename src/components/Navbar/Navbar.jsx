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
            <a href='#' onClick = {showUserDetails}>{user}</a>
            <img src="profile.png" class="user" onClick = {showUserDetails} />
        </div>
      </div>
    )
}

export default Navbar