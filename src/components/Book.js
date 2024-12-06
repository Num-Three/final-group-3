import React, { useState } from 'react';
import Seats from './Seats';
import Payment from './Payment';
import data from '../db.json'
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router';
import Seatmap from './SeatMap';
const SeatSelection = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const handleToggle = (seatID) => {

        if (!selectedSeats.includes(seatID))  //conditional that checks if seat selected is included
        {
            setSelectedSeats([...selectedSeats, seatID])
            setPrice(price + movie.price)

        } else {   //filters out seat if selection is inside 
            setSelectedSeats(selectedSeats.filter((id) => id !== seatID))
            setPrice(price - movie.price)
        }
    }



    //find movie via movie id parameter
    const { movieID } = useParams();
    const movie = data.movies.find((id) => id.movieid.toString() === movieID.toString());
    console.log("Movie ID:", movie);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(0);

    if (redirect === true) {
        return <Navigate to="/payment" price={price} />
    }

    if (!movie) {
        <Navigate to="/" />
        return <p>Movie not found. Please go back and select a valid movie.</p>;
    }

    return (
        <div >
            <div className='center-div'>
                <div className='side-bar'>
                    <h2>Booking Details</h2>
                    <div className='details'>
                        <p><strong>Selected Seats:</strong> {(selectedSeats) ? (selectedSeats.join(', ')) : ("None")}</p>
                        <p><strong>Total Price:</strong> {price} </p>
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