import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username.trim()) return alert("Please enter a username");
    if (!email.trim()) return alert("Please enter an email");
    if (!password) return alert("Please enter a password");

    const exists = users.find((u) => u.email === email);
    if (exists) {
      return alert("Email already registered. Please login.");
    }

    dispatch(signup({ username, email, password }));
    alert("Signup successful. Please login.");
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "15px 30px",
          borderBottom: "1px solid #ddd",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="m-0">🚀 URL Shortener</h2>
        <Link to="/" className="btn btn-success">
          Home
        </Link>
      </div>

      <div
        style={{
          flexGrow: 1,
          backgroundImage:
            'url("https://media.istockphoto.com/id/1323860984/vector/green-background-in-vector-illustration-with-glow-and-lights.jpg?s=612x612&w=0&k=20&c=8IJexeaZOCxSRrNiCCgUvB-dexsy8w9PEF1IF8v4skU=")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >
        <div
          className="card p-4"
          style={{
            maxWidth: 480,
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            boxShadow: "0 0 20px rgba(0,0,0,0.2)",
          }}
        >
          <h2 className="mb-3 text-center">Sign Up</h2>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              className="form-control mb-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="form-control mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="form-control mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="btn btn-success w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
