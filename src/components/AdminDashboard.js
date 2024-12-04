import CreateShowing from "./CreateNowShowing.js"
import React, { useState } from "react";
import data from "../db.json"
function CreateGridItem({request}) {
    return (
        <div class="grid item">
            <h1>Pending Request</h1>
        </div>
    )
}

const AdminRequests = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="requests-grid">
      {data.requests.map((request) => (
        <div key={request.id} className={`request-card ${expandedCard === request.id ? "expanded" : ""}`}>
          <h3 className="request-header">{request.header}</h3>
          <p className="request-summary">
            {expandedCard === request.id ? request.details : request.summary}
          </p>

          {expandedCard === request.id && (
            <div className="movie">
            <img src={request.image}/>

            </div>
          )}

          <div className="request-actions">
            <button onClick={() => toggleExpand(request.id)}>
              {expandedCard === request.id ? "Collapse" : "View"}
            </button>
            {expandedCard === request.id && (
              <>
                <button className="approve-button">Approve</button>
                <button className="deny-button">Deny</button>
              </>
            )}
          </div>

        </div>
      ))}
    </div>
  );
};

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
                    <AdminRequests/>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
