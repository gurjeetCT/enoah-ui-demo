import React, { useState } from "react";

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/">Unit Category</NavLink>
        </li>
        <li>
          <NavLink to="/addUnitDetails">Unit SubType</NavLink>
        </li>
        <li>
          <NavLink to="/convert">Convert Units</NavLink>
        </li>  
        <li>
          <NavLink to="/history">Conversion History</NavLink>
        </li>  
      </ul>
    </nav>
  );
};