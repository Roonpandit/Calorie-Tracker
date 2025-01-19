import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './Box/AuthContext.jsx';
import Home from './Admin/Code/Home.jsx';
import Scanner from './User/Code/Scanner.jsx';
import Front from './Box/Front.jsx';
import Form from "./Admin/Code/Combo.jsx"
import About from './Box/About.jsx';
import Contact from "./Box/Contact.jsx"
import About_1 from "./Admin/Code/About_1.jsx"
import Contact_1 from "./Admin/Code/Contact_1.jsx"
import Home_2 from './User/Code/Home_2.jsx';
import QRCodeGenerator_2 from "./User/Code/Qr_2.jsx"
import DishDetails_2 from './User/Code/DishDetails_2.jsx';
import Profile from './User/Code/Profile.jsx';
import DishList from './User/Code/DishList.jsx';
import Dish from './Admin/Code/Dish.jsx';
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth(); 
  return isAuthenticated ? children : <Navigate to="/" />;  
}


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />

                      {/* Admin Pages */}
        <Route path="/Home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/add-combo" element={<ProtectedRoute><Form/></ProtectedRoute>} />
        <Route path="/add-dish" element={<ProtectedRoute><Dish/></ProtectedRoute>} />
        <Route path="/About_1" element={<ProtectedRoute><About_1/></ProtectedRoute>} />
        <Route path="/Contact_1" element={<ProtectedRoute><Contact_1/></ProtectedRoute>} />

                      {/* User Pages */}
        <Route path="/Home_2" element={<ProtectedRoute><Home_2/></ProtectedRoute>} />
        <Route path="/qr" element={<ProtectedRoute><QRCodeGenerator_2/></ProtectedRoute>} />
        <Route path="/:id" element={<ProtectedRoute><DishDetails_2/></ProtectedRoute>} />
        <Route path="/scan" element={<ProtectedRoute><Scanner/></ProtectedRoute>} />
        <Route path="/Profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/DishList" element={<ProtectedRoute><DishList/></ProtectedRoute>} />

      </Routes>
    </>


  );
}

export default App;
