import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Box/AuthContext';  // Assuming you have this custom hook
import "../Css/Profile.css";
import Nav_2 from "../Code/Nav_2"

function Profile() {
  const { user } = useAuth();  // Get the logged-in user from useAuth
  const [userData, setUserData] = useState([]);  // Change this to an array to store multiple data items
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.email) return;  // Exit if no user or email

    // Fetch user data from the API
    axios
      .get(
        'https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/UserDish-Data.json'
      )
      .then((response) => {
        const fetchedData = response.data || {};

        // Filter the fetched data based on the logged-in user's email
        const userFilteredData = Object.keys(fetchedData)
          .map((key) => ({
            id: key,
            ...fetchedData[key],
          }))
          .filter((item) => item.email === user.email);  // Match email

        if (userFilteredData.length > 0) {
          setUserData(userFilteredData);  // Store all the filtered data
        } else {
          setError('No matching user data found.');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch data. Please try again.');
        setLoading(false);
      });
  }, [user]);  // Dependency on user to fetch data whenever the user changes

  const handleClick = () => {
    navigate('/DishList');
  };

  return (
    <>
    <Nav_2/>
        <div className="profile-container">
        <h1> Diet Plan</h1>
      <div className="button-container">
        <button className="DishList" onClick={handleClick}>Add More</button>
      </div>
      
      {loading && <p className="loading-message">Loading user data...</p>}
      {error && <p className="error-message">{error}</p>}

      {userData.length > 0 ? (
        userData.map((item) => (
          <div key={item.id} className="user-data-container">
            <h2> {item.food_item}</h2>
            <p><strong>Calories:</strong> {item.calories}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Selected Date:</strong> {item.selectedDate}</p>
          </div>
        ))
      ) : (
        <p>No diet found.</p>
      )}
    </div>
    </>


  );
}

export default Profile;
