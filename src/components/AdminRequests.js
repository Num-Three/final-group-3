import React, { useEffect, useState } from 'react';

const CreateCard = ({ request, handleApprove, handleDeny }) => {
    const { id, bookingid, userid } = request;
    const [user, setUser] = useState({});
    const [booking, setBooking] = useState({});
    const [showing, setShowing] = useState({});
    const [movie, setMovie] = useState({});

    // Fetch user, booking, showing, and movie details
    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:5000/user/${userid}`);
            const data = await response.json();
            setUser(data);
        };

        const fetchBooking = async () => {
            const response = await fetch(`http://localhost:5000/booking/${bookingid}`);
            const data = await response.json();
            setBooking(data);
            if (data.showingid) {
                fetchShowing(data.showingid); // Fetch showing details when booking is available
            }
        };

        const fetchShowing = async (showingid) => {
            const response = await fetch(`http://localhost:5000/showing/${showingid}`);
            const data = await response.json();
            setShowing(data);
            if (data.movieid) {
                fetchMovie(data.movieid); // Fetch movie details when showing is available
            }
        };

        const fetchMovie = async (movieid) => {
            const response = await fetch(`http://localhost:5000/movies/${movieid}`);
            const data = await response.json();
            setMovie(data);
        };

        fetchUser();
        fetchBooking();
        fetchShowing(booking.showingid);
        fetchMovie(showing.movieid)
    }, [userid, bookingid]);

    if (!user || !booking || !showing || !movie) {
        return <div>Loading...</div>; // Display loading while data is fetching
    }

    return (
        <div className="card">
            <h1>Booking Cancellation Request</h1>
            <p>{user.username} wants to cancel their booking.</p>
            <h2>Details:</h2>
            <div>
                <p>Movie: {movie.title}</p> {/* Display movie title */}
                <p>Showtime: {showing.start} to {showing.end}</p> {/* Display showtime */}
            </div>
            <div className="container">
                <button onClick={() => handleApprove(id)}>Approve Request</button>
                <button onClick={() => handleDeny(id)}>Deny Request</button>
            </div>
        </div>
    );
};

function AdminRequests() {
    const [requests, setRequests] = useState([]);

    // Fetch requests on mount
    useEffect(() => {
        const fetchRequests = async () => {
            const response = await fetch('http://localhost:5000/requests');
            const data = await response.json();
            setRequests(data);
        };
        fetchRequests();
    }, []);

    // Approve request
    const handleApprove = async (id) => {
        await fetch(`http://localhost:5000/requests/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'approved' }),
        });

        setRequests(requests.filter(request => request.id !== id)); // Remove approved request
    };

    // Deny request
    const handleDeny = async (id) => {
        await fetch(`http://localhost:5000/requests/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'denied' }),
        });

        setRequests(requests.filter(request => request.id !== id)); // Remove denied request
    };

    return (
        <div className="div-body">
            <div className="admin-table">
                <h3>Requests</h3>
                <div className="admin-grid">
                    {requests.map((request) => (
                        <CreateCard
                            key={request.id}
                            request={request}
                            handleApprove={handleApprove}
                            handleDeny={handleDeny}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminRequests;
