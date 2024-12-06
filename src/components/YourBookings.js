import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function YourBookings() {
    const { userID } = useParams(); 
    const [bookings, setBookings] = useState([]);
    const [showings, setShowings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                // Fetch bookings and showings data from the backend
                const response = await fetch('http://localhost:5000/db.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                
                // Filter bookings for the current user based on userID
                const userBookings = data.booking.filter((booking) => String(booking.seatid) === String(userID));
                setBookings(userBookings);

                // Store the showings data
                setShowings(data.showing);

            } catch (err) {
                setError('Error fetching bookings or showings data.');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingData();
    }, [userID]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Your Bookings</h2>
            {bookings.length > 0 ? (
                bookings.map((booking) => {
                    // Find the corresponding showing for this booking
                    const showing = showings.find((show) => show.showingid === parseInt(booking.showingid));

                    return (
                        <div key={booking.id} className="booking">
                            <h3>Booking ID: {booking.id}</h3>
                            <p>Showing ID: {showing ? showing.showingid : "Not available"}</p>
                            <p>Seat ID: {booking.seatid}</p>
                            <p>Movie ID: {showing ? showing.movieid : "Unknown"}</p>
                            <p>Start Time: {showing ? showing.start : "Unknown"}</p>
                            <p>End Time: {showing ? showing.end : "Unknown"}</p>
                            <p>Date: {showing ? showing.date : "Unknown"}</p>
                        </div>
                    );
                })
            ) : (
                <p>No bookings found for this user.</p>
            )}
        </div>
    );
}

export default YourBookings;
