import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import NowShowing from './components/NowShowing';
import Profile from './components/Profile';
import Movie from './components/Movie';
import Book from './components/Book';
import Payment from './components/Payment';
import Receipt from './components/Receipt';
import YourBookings from "./components/YourBookings";
import AdminShowing from "./components/AdminShowing";
import AdminRequests from "./components/AdminRequests.js";
import AdminEditForm from "./components/AdminEditForm.js";
import AdminAddForm from "./components/AdminAddForm.js";
import AdminSidebar from './components/AdminSidebar.js';
import AdminMovies from './components/AdminMovies.js';

import './stylesheets/User.css';
import './App.css';

const App = () => {
  const [logStatus, changeLogStatus] = useState(false); // Log state
  const [ userid, setUserId ] = useState(); // Extract userid from the route
  return (
    <Router>
      <Routes>
        {/* WITHOUT Navbar */}
        <Route path="/" element={<NoNavbarLayout />}>
          <Route index element={<SignUp changeLogStatus={changeLogStatus} />} />
          <Route path="/signin" element={<SignIn changeLogStatus={changeLogStatus} setUserId={setUserId}/>}/>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/showing" element={<AdminShowing />} />
          <Route path="/admin/movies" element={<AdminMovies />} />
          <Route path="/admin/requests" element={<AdminRequests />} />
          <Route path="/admin/edit-form" element={<AdminEditForm />} />
          <Route path="/admin/add-form" element={<AdminAddForm />} />
          <Route path="/user/now-showing" element={<NowShowing />} />
          <Route path="/user/bookings" element={<YourBookings />} />
          <Route path="/user/profile" element={<Profile />} />
        </Route>

        {/* WITH Navbar */}
        <Route path="/" element={<NavbarLayout logStatus={logStatus} setUserId={setUserId} changeLogStatus={changeLogStatus}/>}>
          <Route path="/nowshowing" element={<NowShowing />} />
          <Route path="/:user/dashboard" element={<UserDashboard />} />
          <Route path="/:user/profile" element={<Profile />} />
          <Route path="/:movieID" element={<Movie />} />
          <Route path="/book/:movieID" element={<Book />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/receipt" element={<Receipt />} />
          
        </Route>
      </Routes>
    </Router>
  );
};

const NoNavbarLayout = () => {
  const location = useLocation(); // Detect current route

  // Check if the route is an admin route
  const isAdminRoute = location.pathname.includes('/admin');
  let selectedSidebarOption = '';

  // Highlight the appropriate sidebar option
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
    <>
      {isAdminRoute && (
        <div className="admin-div">
          <AdminSidebar selected={selectedSidebarOption} />
        </div>
      )}
      <Outlet />
    </>
  );
};

const NavbarLayout = ({ logStatus, setUserId}) => {
  return (
    <>
      <Navbar logStatus={logStatus} setUserId={setUserId}/>
      <Outlet />
    </>
  );
};

export default App;
