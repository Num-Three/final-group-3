import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import "../stylesheets/Admin.css";

const AdminMovies = () => {
    const [moviesData, setMoviesData] = useState([]);
    const navigate = useNavigate();

    // Fetch movies data
    useEffect(() => {
        fetchData('movies', setMoviesData);
    }, []);

    const handleEdit = (id) => {
        navigate("/admin/edit-form", { state: { id: id, editing: "movie" } });
    };

    const fetchData = (tableName, setDataFunction) => {
        fetch(`http://localhost:5000/${tableName}`)
            .then((res) => res.json())
            .then((data) => setDataFunction(data))
            .catch((error) => console.error(`Error fetching ${tableName} data:`, error));
    };

    const handleDeleteMovie = (id) => {
        fetch(`http://localhost:5000/movies/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                setMoviesData(moviesData.filter((movie) => movie.id !== id));
            })
            .catch((error) => console.error(`Error deleting movie:`, error));
    };

    return (
        <div className="div-body">
            <div className="admin-table navbar">
                <button onClick={() => navigate("/admin/add-form", {state: {adding: "movie"}})}>
                    +
                </button>
                <label>Add Movie</label>

            </div>
            <div className="admin-table">
                <h3>Manage Movies</h3>

                <div>
                    {moviesData.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <p>{movie.desc}</p>
                                <p><strong>Cast:</strong> {movie.cast.join(', ')}</p>
                                <p><strong>Director:</strong> {movie.director.join(', ')}</p>
                                <p><strong>Rating:</strong> {movie.rating}</p>
                                <p><strong>ID:</strong> {movie.id}</p>
                                <div className="movie-actions">
                                    <button onClick={() => handleEdit(movie.id)}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteMovie(movie.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="movie-poster">
                                <img
                                    src={movie.image || "default-poster.jpg"}
                                    alt={`${movie.title} poster`}
                                />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AdminMovies;

