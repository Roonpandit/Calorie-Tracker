import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Box/AuthContext"; 
import "../Css/Nav_2.css"
import userLogo from "../../assets/user-logo.jpg";

const Nav_2 = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();


const Handlelogout = () =>{
  logout();
  navigate("/");
}
  return (
    <div>
      <div className="Nav_2-middle">
        <div className="Nav_2">
        <span>
            <Link to="/Home_2">Home</Link>
          </span>
          <span>
            <Link to="/About_1">About</Link>
          </span>
          <span>
            <Link to="/Contact_1">Contact</Link>
          </span>
          {isAuthenticated && (
            <>
              {/* Add the profile logo */}
              <span className="profile-logo">
                <Link to="/Profile">
                  <img
                    src={userLogo}
                    alt=""
                    className="profile-image"
                  />
                </Link>
              </span>

              <button className="logout" onClick={Handlelogout}>
                Logout
              </button>
            </>
          )}       
        </div>
      </div>

    </div>
  );
};

export default Nav_2;
