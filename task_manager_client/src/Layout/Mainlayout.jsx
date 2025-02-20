import { Outlet } from "react-router";
import Navbar from "../Shared/Navbar";


const Mainlayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="px-6 sm:px-30 md:px-60">  
              <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default Mainlayout;