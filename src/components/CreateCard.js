import React, { useEffect, useState } from 'react';

const CreateCard = ({ request, handleApprove, handleDeny }) => {
    const { id, bookingid, userid, status } = request || {};  // Add default empty object for safety
    const [user, setUser] = useState({});
    const [booking, setBooking] = useState({});
    const [showing, setShowing] = useState({});
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            if (userid) {
                const response = await fetch(`http://localhost:5000/user/${userid}`);
                const data = await response.json();
                setUser(data);
            }
        };

        const fetchBooking = async () => {
            if (bookingid) {
                const response = await fetch(`http://localhost:5000/booking/${bookingid}`);
                const data = await response.json();
                setBooking(data);
                if (data && data.showingid) {
                    fetchShowing(data.showingid); // Fetch showing details when booking is available
                }
            }
        };

        const fetchShowing = async (showingid) => {
            const response = await fetch(`http://localhost:5000/showing/${showingid}`);
            const data = await response.json();
            setShowing(data);
            if (data && data.movieid) {
                fetchMovie(data.movieid); // Fetch movie details when showing is available
            }
        };

        const fetchMovie = async (movieid) => {
            const response = await fetch(`http://localhost:5000/movies/${movieid}`);
            const data = await response.json();
            setMovie(data);
        };

        if (request) {
            fetchUser();
            fetchBooking();
        }
    }, [request]);  // Dependency on request object

    // Check if all data is loaded before rendering the card
    if (!user || !booking || !showing || !movie) {
        return <div>Loading...</div>;  // Show loading message until all data is available
    }

    return (
        <div className="card">
            <h1>Booking Cancellation Request</h1>
            <p>{user.username} wants to cancel their booking.</p>
            <h2>Details:</h2>
            <div>
                <p>Movie: {movie ? movie.title : 'N/A'}</p> {/* Display movie title */}
                <p>Showtime: {showing ? `${showing.start} to ${showing.end}` : 'N/A'}</p> {/* Display showtime */}
            </div>

            {status === 'approved' && <p>Status: Approved</p>}
            {status === 'denied' && <p>Status: Denied</p>}
            {status !== 'approved' && status !== 'denied' && (
                <div className="container">
                    <button onClick={() => handleApprove(id)}>Approve Request</button>
                    <button onClick={() => handleDeny(id)}>Deny Request</button>
                </div>
            )}
        </div>
    );
};

export default CreateCard;