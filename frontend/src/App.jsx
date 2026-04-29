import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(localStorage.getItem("eventhubName"));

  function logout() {
    localStorage.removeItem("eventhubToken");
    localStorage.removeItem("eventhubName");
    localStorage.removeItem("eventhubEmail");
    setUserName(null);
    navigate("/");
  }

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="logo">EventHub</Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/create">Create Event</Link>

          {userName ? (
            <>
              <span className="user-label">Hi, {userName}</span>
              <button onClick={logout} className="nav-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/login" element={<Login setUserName={setUserName} />} />
          <Route path="/register" element={<Register setUserName={setUserName} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;