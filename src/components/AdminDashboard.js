import React from "react";
import { useParams } from "react-router";
import DynamicTable from "./DynamicTable";
import data from "../db.json";
import "../stylesheets/Admin.css";

function AdminDashboard() {
  const { userId } = useParams();
  
  return (
    <div className="AdminDashboard">
      <div className="div-body admin-table">
        <h2>Requests</h2>
        <DynamicTable json_data={data.requests} category="requests" />
      </div>

      <div className="div-body admin-table">
        <h2>Now Showing</h2>
        <DynamicTable json_data={data.movies} category="movies" />
      </div>

      <div className="div-body admin-table">
        <h2>Movies</h2>
        <DynamicTable json_data={data.movies} category="movies" />
      </div>
    </div>
  );
}

export default AdminDashboard;
