import CreateShowing from "./CreateNowShowing.js"

function CreateGridItem({request}) {
    return (
        <div class="grid item">
            <h1>Pending Request</h1>
        </div>
    )
}

function AdminDashboard() {
    return (
        <div className="AdminDashboard">
            <ul class="sidebar">
                    <li>
                        <a href="/admin/dashboard">Dashboard</a>
                        <a href="/admin/now-showing">Now Showing</a>
                        <a href="/admin/requests">Requests</a>
                    </li>
            </ul>
            <div class="div-body">
                <h1>Now Showing</h1>
                <CreateShowing/>
            </div>
            <div class="div-body">
                <h2>Requests</h2>
                <div class="grid">
                    <CreateGridItem/>
                    <CreateGridItem/>
                    <CreateGridItem/>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
