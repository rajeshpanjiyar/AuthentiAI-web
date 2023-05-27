import './AppLayout.scss';
import Sidebar from '../Sidebar/Sidebar';
import Main from '../Main/Main';
import Navbar from '../Navbar/Navbar';
import { Outlet } from "react-router-dom";


const AppLayout = () => {
  return (
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
  );
};

export default AppLayout;
