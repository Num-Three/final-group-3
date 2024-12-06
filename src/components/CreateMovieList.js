import React, { useState, } from 'react';
import { Navigate} from 'react-router-dom';

const CreateShowing = ({ movielist }) => {
    const [redirect, setRedirect] = useState(false);
    const [movieID, setMovieID] = useState(0);
    if (redirect) {
        return <Navigate to={`/${movieID}`}/>
    }
    return (
        <div class="carousel">
            {movielist.map((movies) => (
                <>
                    <div class="movie" >
                        <img src={movies.image} alt={movies.title} onClick={() => { setRedirect(true); setMovieID(movies.movieid) }} />

                    </div>

                </>
            ))
            }
        </div>
    );
};

export default CreateShowing;