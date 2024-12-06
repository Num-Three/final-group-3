import { useParams } from 'react-router';
import data from '../db.json';
import { useState } from 'react';
import { Navigate } from 'react-router';
function Movie() {
    const { movieID } = useParams();
    const [redirect, setRedirect] = useState(false);

    const movie = data.movies.find((movie) => String(movie.movieid) === String(movieID));
    const showtimes = data.showing.filter((time) => String(time.movieid) === String(movieID));

    if (redirect) {
        return <Navigate to={`/book/${movieID}`}/>
    }
    return (
        <div className="Movie">
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

                <p>Actors: {movie.cast.join(", ")}</p>
                <p>Director: {movie.director.join(", ")}</p>
            </div>
            {console.log(showtimes)}
            <div>
                {showtimes.map((a) => { return a.start + " - " + a.end})}
            </div>
            <button onClick={() => setRedirect(true)}>Book</button>
        </div>
    );
}

export default Movie;