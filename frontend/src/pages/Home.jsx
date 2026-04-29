import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [weather, setWeather] = useState(null);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    loadWeather();
    loadEventCount();
  }, []);

  async function loadWeather() {
    try {
      const response = await api.get("/weather");
      setWeather(response.data);
    } catch (error) {
      setWeather({
        city: "Tallahassee",
        message: "Weather data is unavailable right now.",
      });
    }
  }

  async function loadEventCount() {
    try {
      const response = await api.get("/events");
      setEventCount(response.data.length);
    } catch (error) {
      setEventCount(0);
    }
  }

  return (
    <div>
      <section className="hero">
        <h1>EventHub</h1>
        <p>
          A simple event planning and coordination app for creating, viewing,
          and managing campus events.
        </p>

        <div className="hero-buttons">
          <Link to="/events" className="button primary">View Events</Link>
          <Link to="/create" className="button secondary">Create Event</Link>
        </div>
      </section>

      <section className="grid">
        <div className="card">
          <h2>Dashboard</h2>
          <p>Total Events Saved:</p>
          <h3>{eventCount}</h3>
        </div>

        <div className="card">
          <h2>Weather</h2>

          {weather ? (
            <>
              <p>City: {weather.city}</p>

              {weather.temperature ? (
                <>
                  <p>Temperature: {weather.temperature}°C</p>
                  <p>Wind Speed: {weather.windspeed} km/h</p>
                </>
              ) : (
                <p>{weather.message}</p>
              )}
            </>
          ) : (
            <p>Loading weather...</p>
          )}
        </div>

        <div className="card">
          <h2>Purpose</h2>
          <p>
            EventHub helps users organize event details in one place instead of
            relying on group chats, flyers, or scattered emails.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;