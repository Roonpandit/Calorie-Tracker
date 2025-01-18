import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './Box/AuthContext.jsx';
import Home from './Admin/Code/Home.jsx';
import QRCodeGenerator from './Admin/Code/Qr.jsx';
import DishDetails from './Admin/Code/DishDetails.jsx';
import Scanner from './Admin/Code/Scanner.jsx';
import Front from './Box/Front.jsx';
import Form from "./Admin/Code/Form.jsx"
import About from './Box/About.jsx';
import Contact from "./Box/Contact.jsx"
import About_1 from "./Admin/Code/About_1.jsx"
import Contact_1 from "./Admin/Code/Contact_1.jsx"
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
        <Route path="/Form" element={<ProtectedRoute><Form/></ProtectedRoute>} />
        <Route path="/scan" element={<ProtectedRoute><Scanner/></ProtectedRoute>} />
        <Route path="/qr" element={<ProtectedRoute><QRCodeGenerator/></ProtectedRoute>} />
        <Route path="/dish/:id" element={<ProtectedRoute><DishDetails/></ProtectedRoute>} />
        <Route path="/About_1" element={<ProtectedRoute><About_1/></ProtectedRoute>} />
        <Route path="/Contact_1" element={<ProtectedRoute><Contact_1/></ProtectedRoute>} />

                      {/* User Pages */}


      </Routes>
    </>


  );
}

export default App;
