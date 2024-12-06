import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import data from '../db.json';

const Login = ({ changeLogStatus }) => {
    const handleLogin = () => {
        changeLogStatus(true); // Simulate login and update logStatus to true
    };

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: ''
    });
    const [redirect, setRedirect] = useState(false);
    const [errors, setErrors] = useState({});
    const [userid, setUser] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            const matchedUser = data.user.find(
                (user) =>
                    user.username === formData.username.trim() && user.password === formData.password.trim()
            );

            if (matchedUser) {
                setErrors({});
                setUser(matchedUser.userid);
                // Store userID in localStorage
                localStorage.setItem('userID', matchedUser.userid);
                setRedirect(true); // Redirect user
            } else {
                setErrors({ general: 'Invalid username or password.' });
            }
        }

        setFormData({
            username: '', password: ''
        });
    };

    if (redirect) {
        handleLogin();
        return <Navigate to={`/${userid}/profile`} replace />; // Navigate to profile page using userID
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 main'>
                    <h2>Sign-In</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="Username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Enter Username"
                            className='form-control'
                        />
                        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
                    </div>

                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter Password"
                            className='form-control'
                        />
                        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                    </div>
                    <button className='btn btn-primary' type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
