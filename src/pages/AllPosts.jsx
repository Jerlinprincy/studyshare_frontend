












import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllPosts.css";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const units = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (let unit in units) {
      const value = Math.floor(seconds / units[unit]);
      if (value >= 1) {
        return `${value} ${unit}${value > 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("https://studyshare-backend-1.onrender.com/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filteredPosts = res.data.filter(
          (post) => post.postedBy?._id !== loggedUser?.id
        );

        setPosts(filteredPosts);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="posts-container">
      <h2 className="posts-title">All Posts</h2>

      {posts.length === 0 ? (
        <p className="no-posts">No posts available</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <div className="post-card" key={post._id}>
              <h3 className="post-title">{post.title}</h3>

              <p className="posted-by">
                Posted by: <span>{post.postedBy?.name || "Unknown"}</span>
              </p>

              <p className="time-ago">{timeAgo(post.createdAt)}</p>

              <p className="desc">{post.description}</p>

              <p className="type">
                Type: <span>{post.type}</span>
              </p>

              {/* IMAGE */}
              {post.type === "image" && post.fileUrl && (
                <>
                  <div className="image-container">
                    <img
                      src={post.fileUrl}
                      alt="Post"
                      className="post-image"
                    />
                  </div>

                  <a
                    href={post.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn"
                  >
                    👁 View Image
                  </a>
                </>
              )}

              {/* VIDEO LINK */}
              {post.type === "video" && post.link && (
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn video-btn"
                >
                  🎥 Watch Video
                </a>
              )}

              {/* WORKSHOP LINK */}
              {post.type === "workshop" && post.link && (
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn workshop-btn"
                >
                  🧑‍🏫 Join Workshop
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPosts;


