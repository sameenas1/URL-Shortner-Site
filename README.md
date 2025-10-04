# 🔗 URL Shortener Site (React + Redux)

A fully client-side URL shortener built with React and Redux. This project offers a clean, cinematic dashboard experience where users can manage a limited set of shortened URLs with intuitive UI and robust state management.

## 🚀 Features

- **User Authentication (Redux-based)**
  - Signup and login handled via Redux state
  - Session persistence using localStorage
  - Logout functionality

- **URL Management**
  - Add a long URL with a custom title
  - Automatically generates a shortened URL (client-side logic)
  - Limit: Each user can add up to **5 URLs**
  - Displays error message when limit is exceeded

- **Dashboard**
  - View list of added URLs with:
    - Title
    - Shortened URL
    - Timestamp
  - Pagination (Redux-controlled)
  - Search by title or original URL
  - Edit or delete existing URLs

## 🧠 Tech Stack

| Frontend        | State Management | Styling       | Utilities     |
|----------------|------------------|---------------|---------------|
| React           | Redux Toolkit     | Modular CSS   | UUID, DateFns |
