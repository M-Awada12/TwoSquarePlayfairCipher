import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import security from "../../img/security.png";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img id="logo-image" src={security} alt="logo" />
          </NavLink>
          <strong className="title-navbar">Two Square Playfair Cipher</strong>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Encrypt/Decrypt
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/explanation"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Explanation
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <div
              className={
                click ? "navbar_toggle navbar_toggle_x" : "navbar_toggle"
              }
              onClick={handleClick}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
