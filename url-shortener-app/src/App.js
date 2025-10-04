import React from "react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />

      <section className="hero text-center" style={{ padding: "80px 20px" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px" }}>
          Simplify Your Links with <span style={{ color: "#007bff" }}>URL Shortener</span>
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "30px" }}>
          Paste long URLs and instantly create short, shareable links.  
          Fast, free, and reliable.
        </p>

        <a
          href="/signup"
          style={{
            background: "#007bff",
            color: "#fff",
            padding: "12px 25px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "1.1rem",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#0056b3")}
          onMouseOut={(e) => (e.target.style.background = "#007bff")}
        >
          Get Started
        </a>

        <div style={{ marginTop: "50px" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/841/841364.png"
            alt="URL Shortener"
            style={{ width: "300px", maxWidth: "90%" }}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
