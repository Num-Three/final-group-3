import React, { useState } from "react";
import { useParams } from 'react-router';
import DynamicTable from "./DynamicTable";
import data from "../db.json"
import "../stylesheets/Admin.css"

function AdminDashboard() {
    const { userId } = useParams();
    return (
        <div className="AdminDashboard">
            <ul class="sidebar">
                <li>
                    <a href="/admin/${userId}/dashboard">Dashboard</a>
                    <a href="/admin/${userId}/now-showing">Now Showing</a>
                    <a href="/admin/${userId}/requests">Requests</a>
                </li>
            </ul>
            <div class="div-body admin-table">
                <h2>Now Showing</h2>
                <DynamicTable data = {data.movies}/>
            </div>
            <div class="div-body admin-table">
                <h2>Requests</h2>
                <DynamicTable data = {data.requests}/>
            </div>
        </div>
    );
}

export default AdminDashboard;
