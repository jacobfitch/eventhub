import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    eventDate: "",
    category: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem("eventhubToken");

    if (!token) {
      setMessage("You must log in before creating an event.");
      return;
    }

    try {
      await api.post("/events", formData);
      setMessage("Event created successfully!");

      setFormData({
        title: "",
        description: "",
        location: "",
        eventDate: "",
        category: "",
      });

      setTimeout(() => {
        navigate("/events");
      }, 800);
    } catch (error) {
      setMessage("Could not create event. Please check your login and try again.");
    }
  }

  return (
    <div>
      <h1>Create Event</h1>
      <p className="page-subtitle">
        This form sends a POST request to the protected backend endpoint.
      </p>

      <form className="form-card" onSubmit={handleSubmit}>
        <label>Event Title</label>
        <input
          type="text"
          name="title"
          placeholder="Campus Game Night"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Describe the event..."
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <label>Location</label>
        <input
          type="text"
          name="location"
          placeholder="Student Center"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Event Date</label>
        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          <option value="Social">Social</option>
          <option value="Academic">Academic</option>
          <option value="Career">Career</option>
          <option value="Community">Community</option>
          <option value="Sports">Sports</option>
        </select>

        <button type="submit" className="button primary full-width">
          Create Event
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}

export default CreateEvent;