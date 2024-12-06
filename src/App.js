import './App.css';
import NowShowing from "./components/NowShowing";
import YourBookings from "./components/YourBookings";
import Profile from "./components/Profile";
import Login from "./components/Login";
import UserDashboard from "./components/Dashboard"
import AdminDashboard from "./components/AdminDashboard";
import AdminShowing from "./components/AdminShowing";
import AdminRequests from "./components/AdminRequests.js";
import AdminEditForm from "./components/AdminEditForm.js";
import AdminSidebar from "./components/AdminSidebar.js";

import 'boxicons';

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

function App() {
  return (
    <div>
      <AdminSidebar selected={"dashboard"} />
      <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/user/now-showing" element={<NowShowing />} />
            <Route path="/user/bookings" element={<YourBookings />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/admin/:id/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/:id/now-showing" element={<AdminShowing />} />
            <Route path="/admin/:id/requests" element={<AdminRequests />} />
            <Route path="/admin/:id/edit-form" element={<AdminEditForm />} />
        </Routes>
      </ Router>
    </div>
  );
}

export default App;
