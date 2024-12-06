import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';

function Movie() {
    const { movieID } = useParams();
    const [movie, setMovie] = useState(null);
    const [showtimes, setShowtimes] = useState([]);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        // Fetch the movie and showtimes from the server
        const fetchMovieData = async () => {
            try {
                const movieResponse = await fetch(`http://localhost:5000/movies/${movieID}`);
                const movieData = await movieResponse.json();
                setMovie(movieData);

                const showtimesResponse = await fetch(`http://localhost:5000/showing?movieid=${movieID}`);
                const showtimesData = await showtimesResponse.json();
                setShowtimes(showtimesData);
            } catch (error) {
                console.error('Error fetching movie or showtimes:', error);
            }
        };

        fetchMovieData();
    }, [movieID]);

    if (redirect) {
        return <Navigate to={`/book/${movieID}`} />;
    }

    if (!movie) {
        return <p>Loading movie details...</p>;
    }

    return (
        <div className="Movie">
            <div>
                <p>{movie.title}</p>
            </div>
            <div className="movie">
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
                <p><strong>Showtimes:</strong></p>
                {showtimes.length > 0 ? (
                    showtimes.map((showing) => (
                        <p key={showing.showingid}>{showing.start} - {showing.end}</p>
                    ))
                ) : (
                    <p>No showtimes available.</p>
                )}
            </div>
            <button onClick={() => setRedirect(true)}>Book</button>
        </div>
    );
}

export default Movie;
