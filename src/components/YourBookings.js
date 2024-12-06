import React from 'react';
import { useParams } from 'react-router-dom';
import data from '../db.json'; 

function YourBookings() {
    const { userID } = useParams(); 

    console.log('User ID from URL:', userID); 

    const userBookings = data.booking.filter((booking) => {
        console.log('Booking seatid:', booking.seatid); 
        return String(booking.seatid) === String(userID); 
    });


    return (
        <div>
            <h2>Your Bookings</h2>
            {userBookings.length > 0 ? (
                userBookings.map((booking) => {
                    const showing = data.showing.find((show) => show.showingid === parseInt(booking.showingid)); // Use parseInt to compare numbers

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
