import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function NowShowing() {
    const newDate = new Date();
    const today = {
        day: newDate.getDate(),
        month: newDate.getMonth() + 1, // Months are 0-based
        year: newDate.getFullYear(),
        dayofweek: newDate.getDay(),
    };

    const [selectedDate, setSelectedDate] = useState([today.month, today.day]);
    const [redirect, setRedirect] = useState(false);
    const [moviesData, setMoviesData] = useState([]);
    const [showingsData, setShowingsData] = useState([]);

    // Fetch movie and showings data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const moviesResponse = await fetch('http://localhost:5000/movies');
                const movies = await moviesResponse.json();
                setMoviesData(movies);

                const showingsResponse = await fetch('http://localhost:5000/showing');
                const showings = await showingsResponse.json();
                setShowingsData(showings);
            } catch (error) {
                console.error('Error fetching movie or showing data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to get showings based on the selected date
    const getShowingsForDate = (date) => {
        return showingsData.filter((showing) => {
            const showingDate = new Date(showing.date); // Ensure 'showing.date' is a valid Date object
            const showingMonth = showingDate.getMonth() + 1; // Months are 0-based
            const showingDay = showingDate.getDate();

            return showingMonth === date[0] && showingDay === date[1]; // Compare month and day
        });
    };

    // Get today's showings initially
    const todayShowings = getShowingsForDate(selectedDate);

    // We want to keep a list of unique movies, so we map over today's showings and gather the unique movie IDs
    const movieIdsForToday = todayShowings.map(showing => showing.id);
    
    // Filter the movies from the 'moviesData' array to include only those that have showings today
    const uniqueMovies = moviesData.filter(movie => movieIdsForToday.includes(movie.id));

    if (redirect) {
        return <Navigate to="/booking" />;
    }

    // Function to render movie details and its showtimes
    const renderMovie = (movie) => {
        const showtimes = todayShowings.filter(showing => showing.id === movie.id);

        return (
            <div className="Movie" key={movie.id}>
                <div>
                    <p>{movie.title}</p>
                </div>
                <div className='movie'>
                    <img src={movie.image} alt={movie.title} />
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
                        {`${date[0]}/${date[1]}`}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default NowShowing;
