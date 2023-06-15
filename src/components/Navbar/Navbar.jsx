import React, { Fragment } from 'react';
import './Navbar.scss';
import { useNavigate } from "react-router-dom";
import { auth } from '../../pages/utility/Firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
const Navbar = () => {
    const [user, setUser] = useAuthState(auth);
    const showUserDetails = () => {
        alert("User Details");
    }
    const nav = useNavigate();
    const signOutFunction = () => {
      auth
        .signOut()
        .then(() => {
          console.log("User Signed Out");
          localStorage.removeItem("user");
          nav("/");
        })
        .catch((err) => {
          console.log("Error in sign out ", err);
        });
    };
    return (
      <Fragment>
      <div className='navbar'>
        <div className='navbar__left'>
        </div>
        <div className='navbar__right'>
            <div onClick = {showUserDetails}>{user}</div>
            <img src="profile.png" class="user" alt="User Profile" onClick = {showUserDetails} />
        </div>
      </div>
      </Fragment>
    )
}

export default Navbar