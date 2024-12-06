import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

const Navbar = ({ logStatus }) => {
    const { userid } = useParams(); // Extract userid from the route
    const [user, setUser] = useState(null); // State to store user data

    // Fetch user data based on userid
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/users/${userid}`);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data); // Store user data in state
                } else {
                    console.error("Failed to fetch user data:", response.statusText);
                    setUser(null); // Handle case where user data isn't available
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (userid) {
            fetchUser();
        }
    }, [userid]);

    return (
        <div>
            <nav>
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav topnav">
                            <li className="nav-item">
                                <Link to="/user/dashboard" className="navbar-brand">Cinema Booking System</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/nowshowing" className="nav-link">NOW SHOWING</Link>
                            </li>

                            {logStatus ? (
                                // If logStatus is true
                                <>
                                    <li className="right">
                                        <Link to="/profile" className="nav-link">Profile</Link>
                                    </li>
                                    <li className="right">
                                        <Link to="/profile" className="nav-link">Notifications</Link>
                                    </li>
                                </>
                            ) : (
                                // If logStatus is false
                                <li className="right">
                                    <Link to="/sign-up" className="nav-link">Sign In</Link>
                                </li>
                            )}
                            <li className="right">
                                <Link to="/profile" className="nav-link">
                                    <div className="profile_thumb">
                                        {/* Display user profile image if available */}
                                        {user?.profilePicture ? (
                                            <img src={user.profilePicture} alt="Profile" />
                                        ) : (
                                            <span>Loading...</span>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
