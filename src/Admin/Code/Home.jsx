import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Home.css';
import Nav_1 from './Nav_1';

const Home = () => {
  const navigate = useNavigate(); 

  const handleComboClick = () => {
    navigate('/add-dish'); 
  };
  const handleadddish = () => {
    navigate('/add-combo'); 
  }; 
  return (
    <>
    <Nav_1/>
    <div className='home-container'>
        <h1 className="text">Kcal Calculator</h1>
      <div className="btn-d">
        <button onClick={handleComboClick}>Add Dish</button>
        <button  onClick={handleadddish}>Add Combo</button>
      </div>
    </div>
    </>

  );
};

export default Home;
