import React, { useState, useEffect } from 'react';
import Payment from './Payment';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router';
import Seatmap from './SeatMap';

const SeatSelection = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [price, setPrice] = useState(0);
    const [movie, setMovie] = useState(null); // State to store movie details
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true); // State to track loading status

    const { movieID } = useParams(); // Extract movie ID from the URL

    // Fetch data from the server
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`http://localhost:5000/movies/${movieID}`);
                if (response.ok) {
                    const data = await response.json();
                    setMovie(data); // Set movie details in state
                    setLoading(false); // Set loading to false after data is fetched
                } else {
                    console.error("Failed to fetch movie:", response.statusText);
                    setMovie(null); // Set null if the movie is not found
                    setLoading(false); // Set loading to false even if the movie is not found
                }
            } catch (error) {
                console.error("Error fetching movie data:", error);
                setLoading(false); // Set loading to false if there's an error
            }
        };

        fetchMovie();
    }, [movieID]);

    const handleToggle = (seatID) => {
        if (!selectedSeats.includes(seatID)) {
            setSelectedSeats([...selectedSeats, seatID]);
            setPrice(price + (movie ? movie.price : 0)); // Update price dynamically
        } else {
            setSelectedSeats(selectedSeats.filter((id) => id !== seatID));
            setPrice(price - (movie ? movie.price : 0)); // Update price dynamically
        }
    };

    if (redirect) {
        return <Navigate to="/payment" state={{ price }} />;
    }

    // Only show loading message or redirect if the movie is still loading or there's an error
    if (loading) {
        return <p>Loading movie details...</p>;
    }

    // If no movie data, show an error or redirect to a different page (e.g., home page)
    if (!movie) {
        return (
            <div>
                <p>Movie not found.</p>
                <Navigate to="/" />
            </div>
        );
    }

    return (
        <div>
            <div className='center-div'>
                <div className='side-bar'>
                    <h2>Booking Details</h2>
                    <div className='details'>
                        <p><strong>Selected Seats:</strong> {selectedSeats.length > 0 ? selectedSeats.join(', ') : "None"}</p>
                        <p><strong>Total Price:</strong> {price}</p>
                    </div>
                    <div className='movie'>
                        <img src={movie.image} alt="Seat Preview" style={{ width: "100%" }} />
                    </div>
                    <div>
                        <Payment price={price} />
                    </div>
                </div>

                <div className='seatmap'>
                    <Seatmap handleToggle={handleToggle} selectedSeats={selectedSeats} />
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
