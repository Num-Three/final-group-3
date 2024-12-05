import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Import BrowserRouter and useLocation
import Navbar from './components/Navbar';
import Login from './components/Login';
import UserDashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import NowShowing from './components/NowShowing.js';
import Profile from './components/Profile.js';
import 'bootstrap/dist/css/bootstrap.css';


const App = () => {
  

  return (
    <Router> {/* Make sure the entire app is wrapped by Router */}
      <AppRoutes />
    </Router>
  );
};

const AppRoutes = () => {
  const location = useLocation(); // current Location
  // LIST of Router without Navbar
  const noNavbarRoutes = ['/', '/admin/dashboard'];

  const [logStatus, changeLogStatus] = useState(false); //log state
  

  return (
    <>
      {/* If not included in the list, TRUE */}
      {!noNavbarRoutes.includes(location.pathname) && <Navbar  logStatus={logStatus}/>}

      <Routes>
        <Route path="/" element={<Login changeLogStatus={changeLogStatus}/>} />
        <Route path="/nowshowing" element={<NowShowing />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
