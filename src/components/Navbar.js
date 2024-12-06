import { Link } from 'react-router-dom';
import data from '../db.json'
import { useParams } from 'react-router';


const Navbar = ({ logStatus }) => {
    const {userid} = useParams();
    return (
        <div>
            <nav className="navbar navbar-expand-lg sticky-top">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav topnav">
                            <li className="nav-item">
                                <Link to="/user/dashboard" className="navbar-brand">Cinema Booking System</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/nowshowing" className="nav-link">NOW SHOWING</Link>
                            </li>

                            {logStatus === true ? (
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
                                <Link to="/" className="nav-link"><div className="profile_thumb"><img src={userid}></img></div></Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;