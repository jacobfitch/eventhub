import { useEffect, useState } from "react";
import api from "../services/api";

function Events() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("Loading events...");

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const response = await api.get("/events");
      setEvents(response.data);

      if (response.data.length === 0) {
        setMessage("No events have been created yet.");
      }
    } catch (error) {
      setMessage("Could not load events. Make sure the backend is running.");
    }
  }

  return (
    <div>
      <h1>Events</h1>
      <p className="page-subtitle">
        These events are loaded from the Spring Boot backend and H2 database.
      </p>

      {events.length === 0 ? (
        <div className="card">
          <p>{message}</p>
        </div>
      ) : (
        <div className="event-list">
          {events.map((event) => (
            <div className="card event-card" key={event.id}>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Date:</strong> {event.eventDate}</p>
              <p><strong>Category:</strong> {event.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;