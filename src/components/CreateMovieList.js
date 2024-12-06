import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const CreateShowing = ({ movielist }) => {
    const [redirect, setRedirect] = useState(false);
    const [movieID, setMovieID] = useState(0);

    // Check if movielist is an array before trying to map
    if (!Array.isArray(movielist)) {
        return <p>Error: movielist is not a valid array</p>;
    }

    if (redirect) {
        return <Navigate to={`/${movieID}`} />
    }

    return (
        <div className="carousel">
            {movielist.length > 0 ? (
                movielist.map((movie) => (
                    <div className="movie" key={movie.id}>
                        <img
                            src={movie.image}
                            alt={movie.title}
                            onClick={() => {
                                setRedirect(true);
                                setMovieID(movie.id);
                            }}
                        />
                    </div>
                ))
            ) : (
                <p>No movies available.</p>
            )}
        </div>
    );
};

export default CreateShowing;
