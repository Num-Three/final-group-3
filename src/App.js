import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, } from 'react-router-dom'; // Import BrowserRouter
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import NowShowing from './components/NowShowing';
import Profile from './components/Profile';
import Movie from './components/Movie';
import Book from './components/Book';
import EditProfile from './components/EditProfile';
import Bookings from './components/YourBookings';
import './stylesheets/User.css';

const App = () => {
  const [logStatus, changeLogStatus] = useState(false); // log state
  const newDate = new Date();

  const [today, SetDate] = useState({
    day: newDate.getDate(),
    month: newDate.getMonth() + 1, // Months are 0-based
    year: newDate.getFullYear(),
    dayofweek: newDate.getDay(),
  });

  console.log(today);

  return (
    <Router> 
      <Routes>
        {/* WITHOUT Navbar */}
        <Route path="/" element={<NoNavbarLayout />}>
          <Route index element={<SignUp changeLogStatus={changeLogStatus} />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
        </Route>

        {/* WITH Navbar */}
        <Route path="/" element={<NavbarLayout logStatus={logStatus} />}>
          <Route path="/nowshowing" element={<NowShowing />} />
          <Route index path="/:user/dashboard" element={<UserDashboard />} />
          <Route path="/:userID/profile" element={<Profile />} />
          <Route path="/edit-profile/:userID" element={<EditProfile />} />
          <Route path="/:movieID" element={<Movie />} />
          <Route path="/book/:movieID" element={<Book />} />
          <Route path="/:userID/yourbookings" element={<Bookings />} />
        </Route>
      </Routes>
    </Router>
  );
};

const NoNavbarLayout = () => {
  return (
    <>
      <Outlet/>
    </>
  );
};

const NavbarLayout = ({ logStatus }) => {
  return (
    <>
      <Navbar logStatus={logStatus}/>
      <Outlet/>
    </>
  );
};

export default App;
