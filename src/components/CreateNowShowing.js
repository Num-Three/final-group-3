import data from "../db.json"

const CreateShowing = () => {
    return (
        <div class="carousel">
                {data.movies.map((movie) => (
                    <div class="carousel-item">
                        <img src={movie.image} alt={movie.title}/>
                    </div>
                ))}
        </div>
    )
}

export default CreateShowing;