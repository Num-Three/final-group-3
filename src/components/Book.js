import React, { useState } from 'react';
import Seats from './Seats';
import data from '../db.json'

const SeatSelection = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatSelect = (updateFunction) => {
        setSelectedSeats(updateFunction(selectedSeats));
    };
    const handleSeatRemove = (updateFunction) => {
        setSelectedSeats(updateFunction(selectedSeats));
    };


    return (
        <>
            <div className='grid-container'>
                {["A1", "A2", "A3", "A4", "A5", "A6"].map((seatID) =>
                    (
                    
                    <div className='grid-item'>
                        <Seats
                            key={seatID}
                            seatnum={seatID}
                            id={seatID}
                            onClick={(event) => !selectedSeats.includes(event.target.id) ?
                                (handleSeatSelect((selected) => [...selected, event.target.id])) :
                                (handleSeatRemove((selected) => selected.filter((id) => id !== event.target.id)))}
                            isSelected={selectedSeats.includes(seatID)}
                        />
                    </div>
                
                )
            )}
            </div>
            <div>Selected Seats: {selectedSeats.join(', ')}</div>
        </>
    );
};

export default SeatSelection;