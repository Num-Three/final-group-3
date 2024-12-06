import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../db.json';  // Assuming db.json is in the root of the src folder or adjust accordingly

function EditProfile() {
    const { userID } = useParams();  // Extract userID from URL params
    const [user, setUser] = useState(null);  // User state to hold user data
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        img: ''
    });
    const navigate = useNavigate();  // Hook to navigate between pages

    // Fetch the user data when the component mounts
    useEffect(() => {
        const foundUser = data.user.find((user) => String(user.userid) === String(userID));
        if (foundUser) {
            setUser(foundUser);
            setFormData({
                username: foundUser.username,
                email: foundUser.email,
                img: foundUser.img
            });
        }
    }, [userID]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle save changes
    const handleSaveChanges = (e) => {
        e.preventDefault();

        // Find the user and update the user data in the simulated db
        const updatedUserList = data.user.map((user) => {
            if (String(user.userid) === String(userID)) {
                return {
                    ...user,
                    username: formData.username,
                    email: formData.email,
                    img: formData.img
                };
            }
            return user;
        });

        // Here you would normally make an API request to save data to a backend.
        // For now, we simulate saving by updating the data object.
        // Set the updated data back (optional if you need it reflected in your app immediately)
        data.user = updatedUserList;

        // Navigate back to profile page after saving changes
        navigate(`/${userID}/profile`);
    };

    // If the user is not found
    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="EditProfile">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSaveChanges}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter Username"
                        className="form-control"
                    />
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter Email"
                        className="form-control"
                    />
                </div>

                <div>
                    <label htmlFor="img">Profile Image URL:</label>
                    <input
                        type="text"
                        id="img"
                        name="img"
                        value={formData.img}
                        onChange={handleInputChange}
                        placeholder="Enter Image URL"
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
}

export default EditProfile;
