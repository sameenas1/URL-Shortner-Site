import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUrl } from "../redux/urlSlice";
import { useNavigate } from "react-router-dom";

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8);
}

export default function UrlForm() {
  const [title, setTitle] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, setError] = useState(""); 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const allUrls = useSelector((state) => state.urls.urls);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const userUrls = allUrls.filter((u) => u.userId === user.id);

    if (userUrls.length >= 5) {
      setError("🚫 URL limit reached: you can only add 5 URLs.");
      return;
    }

    if (!title.trim() || !originalUrl.trim()) {
      setError("⚠️ Please fill in both Title and URL.");
      return;
    }

    const shortUrl = generateShortCode();

    dispatch(
      addUrl({
        userId: user.id,
        title: title.trim(),
        originalUrl: originalUrl.trim(),
        shortUrl,
        addedAt: new Date().toLocaleString(),
      })
    );

    setTitle("");
    setOriginalUrl("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError(""); 
          }}
        />
      </div>
      <div className="mb-2">
        <input
          type="url"
          className="form-control"
          placeholder="https://example.com"
          value={originalUrl}
          onChange={(e) => {
            setOriginalUrl(e.target.value);
            setError(""); 
          }}
        />
      </div>
      <button className="btn btn-primary">Add URL</button>

      {error && (
        <div className="mt-2 text-danger fw-semibold">
          {error}
        </div>
      )}
    </form>
  );
}
