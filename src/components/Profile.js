import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../db.json';  

function Profile() {
    const { userID } = useParams(); 
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const navigate = useNavigate();  

    useEffect(() => {
        console.log('userID from URL:', userID);

        const foundUser = data.user.find((user) => {
            console.log('Checking user with ID:', user.userid);  
            return String(user.userid) === String(userID);  
        });

        console.log('Found user:', foundUser);

        if (!foundUser) {
            setError('User not found');
        } else {
            setUser(foundUser);
        }

        setLoading(false); 
    }, [userID]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Handle edit profile
    const handleEditProfile = () => {
        navigate(`/edit-profile/${userID}`);  
    };


    const handleDeleteProfile = () => {
        <p>bahhhhhhhhh</p>
    };

    const handleGoToBookings = () => {
        navigate(`/${userID}/yourbookings`); 
    };


    return (
        <div className="Profile">
            <div>
                <p>Welcome, {user.username}</p>
            </div>
            <div className="profile">
                <img src={user.img} alt={user.username} />
            </div>
            <div>
                <p>Email: {user.email}</p>
                <p>Creation Date: {user.creationdate}</p>
            </div>

            {/* Edit Profile Button */}
            <button onClick={handleEditProfile}>Edit Profile</button>

            {/* Delete Profile Button */}
            <button onClick={handleDeleteProfile}>Delete Profile</button>

            {/* BOOKING*/}
    
            <button onClick={handleGoToBookings}>Current Bookings</button>
        </div>
    );
}

export default Profile;
