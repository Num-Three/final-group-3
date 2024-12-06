import React, { useState, useEffect } from 'react';
import CreateMovieList from './CreateMovieList';

function Dashboard() {
    const [movies, setMovies] = useState([]);
    const [nowShowing, setNowShowing] = useState([]);
    const [comingSoon, setComingSoon] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data dynamically from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch movies
                const moviesResponse = await fetch("http://localhost:5000/movies");
                const moviesData = await moviesResponse.json();

                // Fetch now showing and coming soon lists
                const nowShowingResponse = await fetch("http://localhost:5000/nowshowing");
                const nowShowingData = await nowShowingResponse.json();

                const comingSoonResponse = await fetch("http://localhost:5000/comingsoon");
                const comingSoonData = await comingSoonResponse.json();

                // Log the data to verify the structure
                console.log('Movies:', moviesData);
                console.log('Now Showing:', nowShowingData);
                console.log('Coming Soon:', comingSoonData);

                // Set state with the fetched data
                setMovies(moviesData);
                setNowShowing(nowShowingData); // Directly set nowshowing array from the backend
                setComingSoon(comingSoonData); // Directly set comingsoon array from the backend
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Turn off loading state
            }
        };

        fetchData();
    }, []);

    // Check the data types in the console
    console.log("Movies IDs:", movies.map(movie => movie.id));  // Log all movie ids
    console.log("Now Showing IDs:", nowShowing);  // Log now showing ids
    console.log("Coming Soon IDs:", comingSoon);  // Log coming soon ids

    // Filter movies based on the showing IDs in nowshowing and comingsoon arrays
    const filteredNowShowing = movies.filter((movie) => nowShowing.includes(movie.id)) // Use 'id' from the movie object
    

    const filteredComingSoon = Array.isArray(comingSoon)
        ? movies.filter((movie) => comingSoon.includes(movie.id)) // Use 'id' from the movie object
        : [];

    console.log('Filtered Now Showing:', filteredNowShowing); // Log to debug
    console.log('Filtered Coming Soon:', filteredComingSoon); // Log to debug

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>NOW SHOWING</h1>
            {filteredNowShowing.length > 0 ? (
                <CreateMovieList movielist={filteredNowShowing} />
            ) : (
                <p>No movies currently showing.</p>
            )}

            <h1>COMING SOON</h1>
            {filteredComingSoon.length > 0 ? (
                <CreateMovieList movielist={filteredComingSoon} />
            ) : (
                <p>No movies coming soon.</p>
            )}

            <div className="Dashboard"></div>
        </>
    );
}

export default Dashboard;
