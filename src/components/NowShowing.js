import data from '../db.json';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';


function Showing() {
    const newDate = new Date();

    const today = {
        day: newDate.getDate(),
        month: newDate.getMonth() + 1, // Months are 0-based
        year: newDate.getFullYear(),
        dayofweek: newDate.getDay(),
    };

    const [selectedDate, setSelectedDate] = useState([today.month, today.day]); // Keep track of the selected date
    const [redirect, setRedirect] = useState(false);

    // Function to get showings based on selected date
    const getShowingsForDate = (date) => {
        return data.showing.filter((showing) => {
            return String(showing.date[0]) === String(date[0]) && String(showing.date[1]) === String(date[1]);
        });
    };

    // Get today's showings initially
    const todayShowings = getShowingsForDate(selectedDate);

    // We want to keep a list of unique movies, so we map over today's showings and gather the unique movie IDs
    const movieIdsForToday = todayShowings.map(showing => showing.movieid);
    
    // Filter the movies from the 'data.movies' array to include only those that have showings today
    const uniqueMovies = data.movies.filter(movie => movieIdsForToday.includes(movie.movieid));

    if (redirect) {
        return <Navigate to="/booking" />;
    }

    // Function to render movie details and its showtimes
    const renderMovie = (movie) => {
        const showtimes = todayShowings.filter(showing => showing.movieid === movie.movieid);

        return (
            <div className="Movie" key={movie.movieid}>
                <div>
                    <p>{movie.title}</p>
                </div>
                <div className='movie'>
                    <img src={movie.image} alt={movie.title}></img>
                </div>
                <div>
                    <p>{movie.desc}</p>
                </div>
                <div>
                    <p>Actors: {movie.cast ? movie.cast.join(", ") : 'N/A'}</p>
                    <p>Director: {movie.director ? movie.director.join(", ") : 'N/A'}</p>
                </div>
                <div>
                    {/* Display all showtimes for the movie */}
                    {showtimes.map((a) => <p key={a.showingid}>{a.start} - {a.end}</p>)}
                </div>
                <button onClick={() => setRedirect(true)}>Book</button>
            </div>
        );
    };

    // Function to generate the next 7 days
    const generateNextDays = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const futureDate = new Date(newDate);
            futureDate.setDate(newDate.getDate() + i);
            const formattedDate = [futureDate.getMonth() + 1, futureDate.getDate()];
            days.push(formattedDate);
        }
        return days;
    };

    return (
        <div className="showing-container">
            <div className="movies-container">
                {uniqueMovies.length > 0 ? uniqueMovies.map(renderMovie) : <p>No showings for this date.</p>}
            </div>

            {/* Buttons for selecting different days */}
            <div className="date-buttons">
                {generateNextDays().map((date, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedDate(date)}
                        className={date[0] === selectedDate[0] && date[1] === selectedDate[1] ? 'selected' : ''}
                    >
                        {`Day ${index + 1}: ${date[0]}/${date[1]}`}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Showing;
