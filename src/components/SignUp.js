import React, { useState, } from 'react';
import { Navigate } from 'react-router-dom';
import data from '../db.json';
const Login = ({ changeLogStatus }) => {  //item parameterized from app.js

    const handleLogin = () => {
        // Simulate login and update logStatus to true
        changeLogStatus(true);
    }; 

    //Form Data Array
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: ''
    });
    const [redirect, setRedirect] = useState(false);
    const [errors, setErrors] = useState({}); //array error states
    const [userid, setUser] = useState("");
    
    // FORM SUBMISSION
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {}; //error list

        // VALIDATIONS - trims input, IF empty, newErrors={"error"}.
        // ID VALIDATION
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }

        // PASSWORD VALIDATION
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors); // Pass the errors to state.
          } else {
            // Find a matching user in the data array
            const matchedUser = data.user.find(
              (user) =>
                user.username === formData.username.trim() && user.password === formData.password.trim()
            );
          
            if (matchedUser) {
              setErrors({}); // Reset errors if login is successful
              setUser(matchedUser.userid);
              setRedirect(true); // Redirect user
            } else {
              setErrors({ general: 'Invalid username or password.' }); // Set a general error
            }
          }

    setFormData({
        username: '', password: ''
    });
            
        };
        
//Navigation re-render
if (redirect) {
    handleLogin();
    return <Navigate to={`/${userid}/dashboard`} replace />;
}

// INPUT CHANGE HANDLE-  takes event name that correspond to the formData object and sets its value to event value.
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
};


return (
    <div className='container'>
        <div className='row' >
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
                    {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}  {/*Prints Out Error  */}
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="text"
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
}

export default Login;
