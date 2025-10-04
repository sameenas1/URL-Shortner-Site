import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      dispatch(login(user));
      console.log("Logged in:", user); 
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header
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
        <button className="btn btn-success" onClick={() => navigate("/")}>
          Home
        </button>
      </header>

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
          className="card p-4 shadow-lg"
          style={{
            maxWidth: 400,
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            boxShadow: "0 0 20px rgba(0,0,0,0.2)",
          }}
        >
          <h3 className="mb-3 text-center">Login</h3>
          <form onSubmit={handleLogin}>
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

export default Login;
