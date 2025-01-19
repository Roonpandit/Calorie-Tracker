import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";
import "./Front.css";

const Front = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formType, setFormType] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [data, setData] = useState({});

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [signupData, setSignupData] = useState({
    username: "",
    type: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [loginData, setLoginData] = useState({
    type: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchAuthData();
  }, []);

  const fetchAuthData = async () => {
    try {
      const response = await axios.get(
        "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/LogIn.json"
      );
      setData(response.data || {});
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async () => {
    const { username, type, email, password, confirmpassword } = signupData;

    if (!username || !type || !email || !password || !confirmpassword) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    if (Object.values(data).some((user) => user.email === email)) {
      alert("User already exists with this Email!");
      return;
    }

    try {
      await axios.post(
        "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/LogIn.json",
        { username, type, email, password }
      );

      alert("Account created successfully! Please login.");
      setSignupData({
        username: "",
        type: "",
        email: "",
        password: "",
        confirmpassword: "",
      });
      setFormType("login");
      fetchAuthData();
    } catch (error) {
      console.log("signup failed", error.response?.data || error.message);
    }
  };

  const handleLogin = () => {
    const { type, email, password } = loginData;

    if (!email || !password) {
      alert("All fields are required!");
      return;
    }

    const user = Object.values(data).find(
      (user) =>
        user.email === email && user.password === password && user.type === type
    );

    if (user) {
      login(user);
      if (user.type === "admin") {
        // {only for owner}
        navigate("/Home");
      } else if (user.type === "user") {
        // {for multiple users}
        navigate("/Home_2");
      }
    } else {
      alert("Invalid Email or Password!");
      setLoginData({ email: "", password: "", type: "" });
    }
  };

  return (
    <div>
      <div className="front-middle">
        <h1 className="text">Kcal Calculator</h1>
        <div className="fronts">
          <span>
            <Link to="/About">About</Link>
          </span>
          <span>
            <Link to="/Contact">Contact</Link>
          </span>
          <div className="fronts-container">
            {formType === "" && (
              <div className="button-container">
                <button
                  onClick={() => setFormType("login")}
                  className="front-button"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="front-content">
          <div className="front-container">
            {formType === "login" && (
              <div className="form-container">
                {/* Close Button */}
                <button
                  className="close-button"
                  onClick={() => setFormType("")} // Close the form
                  aria-label="Close Form"
                >
                  ✖
                </button>
                <h2>Login</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <label>Type:</label>
                    <select
                      value={loginData.type}
                      onChange={(e) =>
                        setLoginData({ ...loginData, type: e.target.value })
                      }
                    >
                      <option value="">Select Type</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      type="email"
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      type="password"
                      placeholder="Enter Password"
                    />
                  </div>
                  <button onClick={handleLogin} className="form-button">
                    Login
                  </button>
                </form>
                <p>
                  Don't have an account?{" "}
                  <span
                    className="link-text"
                    onClick={() => setFormType("signup")}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            )}

            {formType === "signup" && (
              <div className="form-container">
                {/* Close Button */}
                <button
                  className="close-button"
                  onClick={() => setFormType("")} // Close the form
                  aria-label="Close Form"
                >
                  ✖
                </button>
                <h2>Sign Up</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <label>Username:</label>
                    <input
                      value={signupData.username}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          username: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Type:</label>
                    <select
                      value={signupData.type}
                      onChange={(e) =>
                        setSignupData({ ...signupData, type: e.target.value })
                      }
                    >
                      <option value="">Select Type</option>
                      <option value="user">User</option>
                      {/* <option value="admin">Admin</option> */}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({ ...signupData, email: e.target.value })
                      }
                      type="email"
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                      type="password"
                      placeholder="Enter Password"
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                      value={signupData.confirmpassword}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          confirmpassword: e.target.value,
                        })
                      }
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <button onClick={handleSignup} className="form-button">
                    Create Account
                  </button>
                </form>
                <p>
                  Already have an account?{" "}
                  <span
                    className="link-text"
                    onClick={() => setFormType("login")}
                  >
                    Login
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Front;
