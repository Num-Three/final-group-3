import { useNavigate, useLocation } from 'react-router';
import { useState, useEffect } from 'react';

const AdminEditForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [rating, setRatings] = useState([]);

    const returnNavigate = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    const handleMovieSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            id: sent_id,
            title: e.target.title.value,
            image: e.target.image.value,
            desc: e.target.desc.value,
            rating: e.target.rating.value,
            cast: e.target.cast.value.split(',').map((actor) => actor.trim()),
            director: e.target.director.value.split(',').map((dir) => dir.trim()),
            trailer: e.target.trailer.value,
            runtime: parseInt(e.target.runtime.value),
        };

        await fetch(`http://localhost:5000/movies/${sent_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });

        alert('Changes saved!');
        navigate(-1);
    };

    const handleShowingSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            id: sent_id,
            movieid: e.target.movieid.value,
            date: e.target.date.value,
            start: e.target.start.value,
            end: e.target.end.value,
        };

        await fetch(`http://localhost:5000/showing/${sent_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });

        alert('Changes saved!');
        navigate(-1);
    };

    useEffect(() => {
        const loadRatings = async () => {
            const fetchedRatings = await fetchRatings();
            setRatings(fetchedRatings);
        };
        loadRatings();
    }, []);

    const fetchRatings = async () => {
        try {
            const response = await fetch('http://localhost:5000/rating');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching ratings:', error);
            return [];
        }
    };

    const ratingOptions = rating;
    const sent_id = location.state.id;
    const editing = location.state.editing;

    return (
        <div className="div-body">
            <div className="edit-form">
                {editing === "movie" && (
                    <form className="container" onSubmit={handleMovieSubmit}>
                        <h2>Edit Movie</h2>
                        <label>ID</label>
                        <input
                            type="text"
                            name="id"
                            value={sent_id}
                            readOnly
                        />
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                        />
                        <label>Image</label>
                        <input
                            type="text"
                            name="image"
                        />
                        <label>Desc</label>
                        <input
                            type="text"
                            name="desc"
                        />
                        <label>Rating ID</label>
                        <select name="rating">
                            <option value="">Rating Option</option>
                            {ratingOptions.map((rating) => (
                                <option key={rating.id} value={rating.id}>
                                    {rating.rating}
                                </option>
                            ))}
                        </select>
                        <label>Cast</label>
                        <p>Separate actors with a comma (,). <br />(example: Cynthia Erevo, Ariana Grande)</p>
                        <input
                            type="text"
                            name="cast"
                        />
                        <label>Director</label>
                        <input
                            type="text"
                            name="director"
                        />
                        <label>Trailer</label>
                        <input
                            type="text"
                            name="trailer"
                        />
                        <label>Runtime</label>
                        <p>In minutes</p>
                        <input
                            type="text"
                            name="runtime"
                        />

                        <button type="submit">Submit Edits</button>
                        <button type="button" onClick={returnNavigate}>Cancel</button>
                    </form>
                )}

                {editing === "showing" && (
                    <form className="container" onSubmit={handleShowingSubmit}>
                        <h2>Edit Showing</h2>
                        <label>ID</label>
                        <input
                            type="text"
                            name="id"
                            value={sent_id}
                            readOnly
                        />
                        <label>Movie ID</label>
                        <input
                            type="text"
                            name="movieid"
                        />
                        <label>Date</label>
                        <input
                            type="text"
                            name="date"
                        />
                        <label>Start</label>
                        <input
                            type="text"
                            name="start"
                        />
                        <label>End</label>
                        <input
                            type="text"
                            name="end"
                        />
                        <button type="submit">Submit Edits</button>
                        <button type="button" onClick={returnNavigate}>Cancel</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminEditForm;