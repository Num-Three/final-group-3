import React from "react";
import { useState, useEffect } from 'react';
import DynamicTable from "./DynamicTable.js";
import "../stylesheets/Admin.css";

const AdminDashboard = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [showingData, setShowingData] = useState([]);
  const [requestsData, setRequestsData] = useState([]);

  // Fetch data for movies, showing, and requests
  useEffect(() => {
    fetchData("movies", setMoviesData);
    fetchData("showing", setShowingData);
    fetchData("requests", setRequestsData);
  }, []);

  // Helper function to fetch data for a specific table
  const fetchData = (tableName, setDataFunction) => {
    fetch(`http://localhost:5000/${tableName}`)
      .then((res) => res.json())
      .then((data) => setDataFunction(data))
      .catch((error) => console.error(`Error fetching ${tableName} data:`, error));
  };

  // Handle delete for different tables
  const handleDelete = (id, tableName) => {
    fetch(`http://localhost:5000/${tableName}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((deletedItem) => {
        if (tableName === "movies") {
          setMoviesData((prevData) => prevData.filter((item) => item.id !== id));
        } else if (tableName === "showing") {
          setShowingData((prevData) => prevData.filter((item) => item.id !== id));
        } else if (tableName === "requests") {
          setRequestsData((prevData) => prevData.filter((item) => item.id !== id));
        }
      })
      .catch((error) => console.error(`Error deleting ${tableName} item:`, error));
  };

  return (
    <div>
      <div className="div-body">
        <div className="admin-table">
          <h3>Movies</h3>
          <DynamicTable json_data={moviesData} tableName="movies" handleDelete={handleDelete} canEdit={true} />
        </div>

        <div className="admin-table">
          <h3>Showings</h3>
          <DynamicTable json_data={showingData} tableName="showing" handleDelete={handleDelete} canEdit={true}  />
        </div>

        <div className="admin-table">
          <h3>Requests</h3>
          <DynamicTable json_data={requestsData} tableName="requests" handleDelete={handleDelete} canEdit={false} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;