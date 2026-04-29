import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login({ setUserName }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const response = await api.post("/auth/login", formData);

      localStorage.setItem("eventhubToken", response.data.token);
      localStorage.setItem("eventhubName", response.data.name);
      localStorage.setItem("eventhubEmail", response.data.email);

      setUserName(response.data.name);
      navigate("/");
    } catch (error) {
      setMessage("Login failed. Check your email and password.");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <p className="page-subtitle">
        Log in to create and manage events.
      </p>

      <form className="form-card" onSubmit={handleSubmit}>
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
          Login
        </button>

        {message && <p className="form-message">{message}</p>}

        <p className="small-text">
          Need an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;