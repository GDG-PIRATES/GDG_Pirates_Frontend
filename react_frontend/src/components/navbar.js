import React from "react";
import { Link } from "react-router-dom"; 
import "../styles/Navbar.css"; 
import { handleLogout } from "./logout";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">DetectX</div>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/wellness">Wellness Guide</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
