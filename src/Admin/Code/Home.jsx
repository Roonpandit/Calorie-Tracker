import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Home.css';
import Nav_1 from './Nav_1';

const Home = () => {
  const navigate = useNavigate(); 

  const handlescan = () => {
    navigate('/scan'); 
  };
  const handleComboClick = () => {
    navigate('/qr'); 
  };
  const handleadddish = () => {
    navigate('/form'); 
  }; 
  return (
    <>
    <Nav_1/>
    <div className='home-container'>
        <h1 className="text">Kcal Calculator</h1>
      <div className="btn-d">
        <button  onClick={handlescan}>Scan </button>
        <button onClick={handleComboClick}>Combos</button>
        <button  onClick={handleadddish}>Add </button>
      </div>
    </div>
    </>

  );
};

export default Home;
