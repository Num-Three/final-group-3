import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Profile() {
    const { userID } = useParams(); 
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const navigate = useNavigate();  

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user data from db.json on the server
                const response = await fetch('http://localhost:5000/db.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                // Find the user based on userID from URL params
                const foundUser = data.users.find((user) => String(user.userid) === String(userID));

                if (!foundUser) {
                    setError('User not found');
                } else {
                    setUser(foundUser);
                }
            } catch (err) {
                setError('An error occurred while fetching user data.');
                console.error('Error fetching user data:', err);
            } finally {
                setLoading(false); // Stop loading once the fetch is done
            }
        };

        fetchUserData();
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
        // Implement deletion logic if needed
        console.log("Profile deleted!");
        setError('Profile deletion is not implemented.');
    };

    const handleGoToBookings = () => {
        navigate(`/${userID}/yourbookings`); 
    };

    const handleGoToReceipts = () => {
        navigate(`${userID}/receipts`);  
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

            {/* Current Bookings Button */}
            <button onClick={handleGoToBookings}>Current Bookings</button>

            {/* Receipts Button */}
            <button onClick={handleGoToReceipts}>Receipts</button>
        </div>
    );
}

export default Profile;
