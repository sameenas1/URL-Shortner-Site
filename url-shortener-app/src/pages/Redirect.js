import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Redirect() {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem("urls")) || [];
    const match = urls.find((u) => u.shortUrl === shortCode);

    if (match) {
      window.location.href = match.originalUrl; 
    } else {
      alert("Short URL not found");
      navigate("/"); 
    }
  }, [shortCode, navigate]);

  return <p>Redirecting...</p>;
}

export default Redirect;
