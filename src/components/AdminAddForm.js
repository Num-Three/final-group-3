import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import "../stylesheets/Admin.css";

const AdminMovies = () => {
    const navigate = useNavigate();
    const [moviesData, setMoviesData] = useState([]);
    const [newMovie, setNewMovie] = useState({
        title: '',
        desc: '',
        cast: '',
        director: '',
        rating: '',
        runtime: '',
      });

    useEffect(() => {
        fetchData('movies', setMoviesData);
    }, []);

    const returnNavigate = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    const fetchData = (tableName, setDataFunction) => {
        fetch(`http://localhost:5000/${tableName}`)
            .then((res) => res.json())
            .then((data) => setDataFunction(data))
            .catch((error) => console.error(`Error fetching ${tableName} data:`, error));
    };

    // Handle adding a new movie
    const handleAddMovie = async (e) => {
        e.preventDefault();
        const movieData = {
            title: newMovie.title,
            desc: newMovie.desc,
            cast: newMovie.cast.split(',').map((actor) => actor.trim()),
            director: newMovie.director.split(',').map((dir) => dir.trim()),
            rating: newMovie.rating,
            runtime: parseInt(newMovie.runtime),
        };

        await fetch('http://localhost:5000/movies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movieData),
        });

        setMoviesData([...moviesData, movieData]);
        setNewMovie({
            title: '',
            desc: '',
            cast: '',
            director: '',
            rating: '',
            runtime: '',
        }); // Reset form
    };

    return (
        <div className="div-body">
            <div className="edit-form">
                <form className="container" onSubmit={handleAddMovie}>
                    <h2>Add a New Movie</h2>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={newMovie.title}
                        onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                        required
                    />
                    <label>Description</label>
                    <input
                        type="text"
                        name="desc"
                        value={newMovie.desc}
                        onChange={(e) => setNewMovie({ ...newMovie, desc: e.target.value })}
                        required
                    />
                    <label>Cast</label>
                    <input
                        type="text"
                        name="cast"
                        value={newMovie.cast}
                        onChange={(e) => setNewMovie({ ...newMovie, cast: e.target.value })}
                        required
                    />
                    <label>Director</label>
                    <input
                        type="text"
                        name="director"
                        value={newMovie.director}
                        onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })}
                        required
                    />
                    <label>Rating</label>
                    <input
                        type="text"
                        name="rating"
                        value={newMovie.rating}
                        onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
                        required
                    />
                    <label>Runtime (in minutes)</label>
                    <input
                        type="text"
                        name="runtime"
                        value={newMovie.runtime}
                        onChange={(e) => setNewMovie({ ...newMovie, runtime: e.target.value })}
                        required
                    />
                    <button type="submit">Add Movie</button>
                    <button type="button" onClick={returnNavigate}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AdminMovies;

