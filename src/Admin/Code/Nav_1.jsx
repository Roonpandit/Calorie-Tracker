import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Box/AuthContext";
import "../Css/Nav_1.css";
import userLogo from "../../assets/logo-3.png";

const Nav_1 = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const Handlelogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      <div className="Nav_1-middle">
        <div className="Nav_1">
          <span>
            <Link to="/Home">Home</Link>
          </span>
          {/* <span>
            <Link to="/About_1">About</Link>
          </span>
          <span>
            <Link to="/Contact_1">Contact</Link>
          </span> */}
          {isAuthenticated && (
            <button className="logout" onClick={Handlelogout}>
              Logout
            </button>
          )}
                  <span className="profile-logo">
          <Link >
            <img src={userLogo} alt="" className="profile-image" />
          </Link>
        </span>
        </div>
      </div>
    </div>
  );
};

export default Nav_1;
