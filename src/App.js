import './App.css';
import NowShowing from "./components/NowShowing";
import YourBookings from "./components/YourBookings";
import Profile from "./components/Profile";
import Login from "./components/Login";
import UserDashboard from "./components/Dashboard"
import AdminDashboard from "./components/AdminDashboard";

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

function App() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/now-showing" element={<NowShowing />} />
            <Route path="/your-bookings" element={<YourBookings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </ Router>
    </div>
  );
}

export default App;
