function AdminRequests() {
    return (
        <div className="AdminRequests">
        </div>
    );
}

export default AdminRequests;
import React, { useEffect, useState } from 'react';
import CreateCard from "./CreateCard.js";

function AdminRequests() {
    const [requests, setRequests] = useState([]);

    // Fetch requests on mount
    useEffect(() => {
        const fetchRequests = async () => {
            const response = await fetch('http://localhost:5000/requests');
            const data = await response.json();
            setRequests(data);
        };
        fetchRequests();
    }, []);

    // Approve request
    const handleApprove = async (id) => {
        await fetch(`http://localhost:5000/requests/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'approved' }),
        });

        setRequests(requests.map(request => 
            request.id === id ? { ...request, status: 'approved' } : request
        ));
    };

    // Deny request
    const handleDeny = async (id) => {
        await fetch(`http://localhost:5000/requests/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'denied' }),
        });

        setRequests(requests.map(request => 
            request.id === id ? { ...request, status: 'denied' } : request
        ));
    };

    return (
        <div className="div-body">
            <div className="admin-table">
                <h3>Requests</h3>
                <div className="admin-grid">
                    {requests.map((request) => (
                        <CreateCard
                            key={request.id}
                            request={request}
                            handleApprove={handleApprove}
                            handleDeny={handleDeny}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default AdminRequests;
