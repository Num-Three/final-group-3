import { useNavigate, useLocation } from 'react-router';
import AdminSidebar from "./AdminSidebar.js";
import data from "../db.json";

const AdminEditForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const returnNavigate = (e) => {
        e.preventDefault();
        navigate(-1);
    }

    const handleSubmit = async (e) => {
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

    const ratingOptions = data.rating
    const sent_id = location.state.id

    return (
        <div class="div-body">
            <AdminSidebar selected={"dashboard"} />

            <div class="edit-form">
                <form class="container" onSubmit={handleSubmit}>
                    <h2>Edit Movie</h2>
                    <label>ID</label>
                    <input
                        type="text"
                        name="id"
                        value={sent_id}
                        readonly
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
                    <button type="cancel" onClick={returnNavigate}>Cancel</button>
                </form>
            </div>
        </div>
    );
}


export default AdminEditForm;
