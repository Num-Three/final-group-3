const AdminSidebar = ({selected}) => {
    return (
        <div className="sidebar">
               <a href="/admin/${userId}/dashboard" className={selected === "dashboard" ? "selected" : ""}>Dashboard</a>
                <a href="/admin/${userId}/requests" className={selected === "requests" ? "selected" : ""}>Manage Requests</a>
                <a href="/admin/${userId}/requests" className={selected === "requests" ? "selected" : ""}>Manage Movies</a>
                <a href="/admin/${userId}/requests" className={selected === "requests" ? "selected" : ""}>Manage Showing</a>
        </div>
    )
}

export default AdminSidebar;