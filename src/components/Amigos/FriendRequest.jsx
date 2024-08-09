// FriendRequests.jsx
import React from "react";

export default function FriendRequests({ requests, onAccept, onDecline }) {
  return (
    <div>
      <h2>Solicitudes de Amistad</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id} className="request-item">
            <span>{request.name}</span>
            <button onClick={() => onAccept(request.id)}>Aceptar</button>
            <button onClick={() => onDecline(request.id)}>Rechazar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
