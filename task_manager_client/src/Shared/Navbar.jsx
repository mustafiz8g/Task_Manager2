
import { useContext } from "react";

import ThemeToggle from "../Components/ThemeToggle";

import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate(); // Initialize useNavigate

    const photo = user?.photoURL || "https://i.ibb.co/MBtjqXQ/default-avatar.png"; // Default avatar if null
    const name = user?.displayName || "User";

    // Handle Route Change
    const handleRouteChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === "To Do") {
            navigate("/todo");
        } else if (selectedValue === "In Progress") {
            navigate("/progress");
        } else if (selectedValue === "Finished") {
            navigate("/finish");
        }
    };

    return (
        <div className="navbar bg-base-100 shadow-md px-5 py-3 flex justify-between items-center px-6 sm:px-30 md:px-60">
            {/* Left Section: Task Category Dropdown */}
            <div className="flex items-center gap-3">
                <select
                    defaultValue="All Task"
                    className="select select-accent border rounded-md px-3 py-2 font-bold"
                    onChange={handleRouteChange} // Handle selection change
                >
                    <option disabled>All Task</option>
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Finished</option>
                </select>
            </div>
            
            {/* Middle: Add New Task */}
            <div>
                <NavLink to={'/newTask'}>
                    <button data-tip='Add New Task' className="btn btn-soft btn-accent text-2xl rounded-full flex items-center justify-center tooltip tooltip-bottom">+</button>
                </NavLink>
            </div>

            {/* Right Section: Theme Toggle + User Profile */}
            <div className="flex items-center gap-4">
                <ThemeToggle />
                <div className="tooltip tooltip-left" data-tip={name}>
                    <img
                        src={photo}
                        alt="User"
                        className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
