import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import "../stylesheets/Admin.css";

const AdminShowing = () => {
    const [showings, setShowings] = useState([]);
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    // Fetch data for showings and movies
    useEffect(() => {
        const fetchData = async () => {
            try {
                const showingsResponse = await fetch('http://localhost:5000/showing');
                const showingsData = await showingsResponse.json();
                setShowings(showingsData);

                const moviesResponse = await fetch('http://localhost:5000/movies');
                const moviesData = await moviesResponse.json();
                setMovies(moviesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Get movie details by ID
    const getMovieById = (id) => movies.find((movie) => movie.id === id);

    // Delete showing
    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/showing/${id}`, {
                method: 'DELETE',
            });
            setShowings((prevShowings) => prevShowings.filter((showing) => showing.id !== id));
        } catch (error) {
            console.error('Error deleting showing:', error);
        }
    };

    // Edit showing
    const handleEdit = (id) => {
        navigate('/admin/edit-form', { state: { id, editing: 'showing' } });
    };

    return (
        <div className="div-body">
            <div className="admin-table">
                <h3>Manage Showings</h3>
                <div className="admin-grid">
                    {showings.map((showing) => {
                        const movie = getMovieById(showing.movieid);
                        return (
                            <div key={showing.id} className="admin-card">
                                <div className="card-content">
                                    {movie && (
                                        <>
                                            <img
                                                src={movie.image}
                                                alt={movie.title}
                                                className="movie-poster"
                                            />
                                            <h4>{movie.title}</h4>
                                            <p><strong>Description:</strong> {movie.desc}</p>
                                            <p><strong>Showtime:</strong> {showing.date}, {showing.start} - {showing.end}</p>
                                        </>
                                    )}
                                    {!movie && <p>Movie details not found</p>}
                                </div>
                                <div className="card-actions">
                                    <button onClick={() => handleEdit(showing.id)}>Edit</button>
                                    <button onClick={() => handleDelete(showing.id)}>Delete</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AdminShowing;
