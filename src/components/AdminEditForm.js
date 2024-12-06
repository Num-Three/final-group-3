const AdminEditForm = ({ json_data, data_type }) => {
    return (
        <div class="div-body">
            <div class="edit-form">
                <form class="container">
                <h2>Edit Movie</h2>
                <label>ID</label>
                <input
                    type="text"
                    name="id"
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
                <select>
                    <option value="">Rating Option</option>
                </select>
                <label>Cast</label>
                <p>Separate actors with a comma (,). <br/>(example: Cynthia Erevo, Ariana Grande)</p>
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
            </form>
        </div>
        </div>
    );
}


export default AdminEditForm;
