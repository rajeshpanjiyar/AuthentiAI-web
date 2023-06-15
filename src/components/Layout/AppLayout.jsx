import './AppLayout.scss';
import Sidebar from '../Sidebar/Sidebar';
// import Main from '../../pages/Main/Main';
import Navbar from '../Navbar/Navbar';
import { Outlet } from "react-router-dom";
import { Fragment } from 'react';

const AppLayout = () => {
  return (
    <Fragment>
    <>
     <div className="container">
       <div className="sidebar-left">
        <Sidebar />
       </div>
       <div className="right-container">
        <Navbar />
        <div className='outlet-container'>
        <Outlet/>
        </div>
       </div>
     </div>
    </>
    </Fragment>
  );
};

export default AppLayout;
