const AdminSidebar = ({selected}) => {
    return (
        <div className="sidebar">
               <a href="/admin/dashboard" className={selected === "dashboard" ? "selected" : ""}>Dashboard</a>
                <a href="/admin/requests" className={selected === "requests" ? "selected" : ""}>Manage Requests</a>
                <a href="/admin/movies" className={selected === "movies" ? "selected" : ""}>Manage Movies</a>
                <a href="/admin/showing" className={selected === "showing" ? "selected" : ""}>Manage Showing</a>
        </div>
    )
}

export default AdminSidebar;