import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register({ setUserName }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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

    try {
      const response = await api.post("/auth/register", formData);

      localStorage.setItem("eventhubToken", response.data.token);
      localStorage.setItem("eventhubName", response.data.name);
      localStorage.setItem("eventhubEmail", response.data.email);

      setUserName(response.data.name);
      navigate("/");
    } catch (error) {
      setMessage("Registration failed. Try a different email.");
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <p className="page-subtitle">
        Create an account to start planning events.
      </p>

      <form className="form-card" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Jacob"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="jacob@test.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="password123"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="button primary full-width">
          Register
        </button>

        {message && <p className="form-message">{message}</p>}

        <p className="small-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;