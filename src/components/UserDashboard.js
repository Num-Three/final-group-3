import CreateMovieList from './CreateMovieList';
import data from "../db.json";

function Dashboard() {
    
    //filter nowshowing based on nowshowing list
    const nowshowing = data.movies.filter((movie) => data.nowshowing.includes(movie.movieid));
    //filter nowshowing based on coming soon list
    const comingsoon = data.movies.filter((movie) => data.comingsoon.includes(movie.movieid));

    
    return (
        <>
         <h1>NOW SHOWING</h1>
        <CreateMovieList movielist={nowshowing}></CreateMovieList>
        <h1>COMING SOON</h1>
        <CreateMovieList movielist={comingsoon}></CreateMovieList>

        <div className="Dashboard">
           
        </div>
        </>
    );
}

export default Dashboard;
