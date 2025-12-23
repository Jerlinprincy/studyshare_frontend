import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Our Platform</h1>
      <p className="about-text">
        This platform is designed for students and learners to share notes,
        workshops, video links, meeting links, and useful study resources.  
        Users can also view posts from others, manage their own posts
        (edit/delete), and build a collaborative learning community.
      </p>

      <div className="about-features">
        <div className="feature-box">
          <h3>📘 Share Notes</h3>
          <p>Upload your handwritten or digital notes to help others.</p>
        </div>

        <div className="feature-box">
          <h3>🎥 Workshops</h3>
          <p>Post video links, meeting links, or workshop announcements.</p>
        </div>

        <div className="feature-box">
          <h3>👥 Community</h3>
          <p>Explore content posted by other users and grow together.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
