import { Link } from 'react-router-dom';

const Navbar = ({logStatus}) => {
    console.log(logStatus);
    return (
        <div>
            <nav className="navbar navbar-expand-lg sticky-top">
                <div className="container">
                    <Link to="/user/dashboard" className="navbar-brand">Cinema Booking System</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/nowshowing" className="nav-link">NOW SHOWING</Link>
                            </li>
                            
                            {logStatus===true ? (
                                // If logStatus is true
                                
                                <>
                                    <li className="nav-item">
                                        <Link to="/profile" className="nav-link">Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/profile" className="nav-link">Notifications</Link>
                                    </li>
                                </>
                            ) : (
                                // If logStatus is false
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Sign In</Link>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;