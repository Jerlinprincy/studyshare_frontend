import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./auth/Login";
import Register from "./auth/Register";
import MakePost from "./pages/MakePost";
import MyPosts from "./pages/MyPosts.jsx";

import AllPosts from "./pages/AllPosts";

// ✅ Import MyPosts page
// import MyPosts from "./pages/MyPosts";
import Profile from "./pages/Profile";
const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/make-post" element={<MakePost />} />
        <Route path="/profile" element={<Profile />} />
        {/* ✅ New Route for My Posts page */}
        <Route path="/my-posts" element={<MyPosts />} />
      </Routes>
    </Router>
  );
};

export default App;
