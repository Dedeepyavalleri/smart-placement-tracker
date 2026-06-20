import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

};
    return (

    <nav className="navbar">

        <div className="logo">
            Smart Placement Tracker
        </div>

        <div className="nav-links">

            <NavLink to="/dashboard">
                Dashboard
            </NavLink>

            <NavLink to="/companies">
                Companies
            </NavLink>

            <NavLink to="/applications">
                Applications
            </NavLink>

            <NavLink to="/notes">
                Notes
            </NavLink>

        </div>

        <button
            onClick={handleLogout}
        >
            Logout
        </button>

    </nav>

);

}

export default Navbar;