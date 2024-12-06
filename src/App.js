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
import AdminAddForm from "./components/AdminAddForm.js";
import AdminSidebar from './components/AdminSidebar.js';
import AdminMovies from './components/AdminMovies.js';
import 'boxicons';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router';

const AppContent = () => {
  const location = useLocation();  // Use location inside the Router

  const isAdminRoute = location.pathname.includes('/admin');
  
  let selectedSidebarOption = '';
  if (location.pathname.includes('/admin/dashboard')) {
    selectedSidebarOption = 'dashboard';
  } else if (location.pathname.includes('/admin/showing')) {
    selectedSidebarOption = 'showing';
  } else if (location.pathname.includes('/admin/movies')) {
    selectedSidebarOption = 'movies';
  } else if (location.pathname.includes('/admin/requests')) {
    selectedSidebarOption = 'requests';
  }

  return (
    <div>
      {isAdminRoute && (
        <div className="admin-div">
          <AdminSidebar selected={selectedSidebarOption} />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/now-showing" element={<NowShowing />} />
        <Route path="/user/bookings" element={<YourBookings />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/showing" element={<AdminShowing />} />
        <Route path="/admin/movies" element={<AdminMovies />} />
        <Route path="/admin/requests" element={<AdminRequests />} />
        <Route path="/admin/edit-form" element={<AdminEditForm />} />
        <Route path="/admin/add-form" element={<AdminAddForm />} />
      </Routes>
    </div>
  );
};

const App =() => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
