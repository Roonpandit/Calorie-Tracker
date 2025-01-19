import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Home_2.css';
import Nav_2 from './Nav_2';

const Home_2 = () => {
  const navigate = useNavigate(); 

  const handlescan = () => {
    navigate('/scan'); 
  };
  const handleComboClick = () => {
    navigate('/qr'); 
  };

  return (
    <>
    <Nav_2/>
    <div className='home_2-container'>
        <h1 className="text">Kcal Calculator</h1>
      <div className="btn-d">
        <button  onClick={handlescan}>Scan </button>
        <button onClick={handleComboClick}>Combos</button>
      </div>
    </div>
    </>

  );
};

export default Home_2;
