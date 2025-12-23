














import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleNavigation = (path) => {
    if (!isLoggedIn) {
      alert("Please login to continue");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="home-container">
      <div className="gradient-overlay"></div>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <section className="hero-section">
        <div className="badge">🎓 Student Community Platform</div>
        
        <h1 className="hero-title">
          Welcome to <span className="gradient-text">StudyShare</span>
        </h1>
        
        <p className="hero-subtitle">
          Empowering students to share knowledge, collaborate on projects, 
          and grow together through shared resources and experiences.
        </p>

        <div className="hero-buttons">
          <button
            className="hero-btn primary"
            onClick={() => handleNavigation("/posts")}
          >
            <span>Explore Posts</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            className="hero-btn secondary"
            onClick={() => handleNavigation("/make-post")}
          >
            <span>Create Post</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Share Notes</h3>
            <p>Upload and access study materials</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Workshops</h3>
            <p>Join collaborative learning sessions</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Community</h3>
            <p>Connect with fellow students</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;