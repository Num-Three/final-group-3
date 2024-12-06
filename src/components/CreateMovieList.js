import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const CreateShowing = ({ movielist }) => {
    const [redirect, setRedirect] = useState(false);
    const [movieID, setMovieID] = useState(0);

    if (redirect) {
        // Use Navigate to redirect to the movie's page using movieID
        return <Navigate to={`/${movieID}`} />;
    }

    return (
        <div className="carousel">
            {movielist.length > 0 ? (
                movielist.map((movie) => (
                    <div className="movie" key={movie.id}>  {/* Use movie.id as the key */}
                        <img
                            src={movie.image}
                            alt={movie.title}
                            onClick={() => {
                                setMovieID(movie.id);
                                setRedirect(true);
                            }}
                            style={{ cursor: 'pointer' }} // Add a cursor pointer for user interaction
                        />
                    </div>
                ))
            ) : (
                <p>No movies available</p> // Show a fallback message if no movies are passed
            )}
        </div>
    );
};

export default CreateShowing;
