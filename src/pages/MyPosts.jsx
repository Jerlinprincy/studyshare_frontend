import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyPosts.css";

const MyPosts = () => {
  const [myposts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editPostId, setEditPostId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const res = await axios.get("https://studyshare-backend-1.onrender.com/api/posts/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMyPosts(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // ---------------- DELETE POST ----------------
  const deletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`https://studyshare-backend-1.onrender.com/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Post deleted successfully");
      fetchMyPosts();
    } catch (error) {
      console.log(error);
      alert("Failed to delete post");
    }
  };

  // ---------------- EDIT POST ----------------
  const startEdit = (post) => {
    setEditPostId(post._id);
    setEditData({ title: post.title, description: post.description });
  };

  const cancelEdit = () => {
    setEditPostId(null);
    setEditData({ title: "", description: "" });
  };

  const updatePost = async (postId) => {
    try {
      await axios.put(
        `https://studyshare-backend-1.onrender.com/api/posts/${postId}`,
        editData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Post updated successfully");
      setEditPostId(null);
      fetchMyPosts();
    } catch (error) {
      console.log(error);
      alert("Failed to update post");
    }
  };

  // --------------------------------------------------------------

  if (loading) return <div className="loading">Loading your posts...</div>;

  return (
    <div className="myposts-container">
      <h2 className="myposts-title">My Posts</h2>

      {myposts.length === 0 ? (
        <p className="no-posts">You have not created any posts yet.</p>
      ) : (
        <div className="posts-grid">
          {myposts.map((post) => (
            <div className="post-card" key={post._id}>
              {editPostId === post._id ? (
                // ------------------ EDIT FORM -------------------
                <div className="edit-form">
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                  />
                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                  ></textarea>

                  <button
                    className="save-btn"
                    onClick={() => updatePost(post._id)}
                  >
                    Save
                  </button>
                  <button className="cancel-btn" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              ) : (
                // ------------------ NORMAL CARD -------------------
                <>
                  <h3>{post.title}</h3>
                  <p className="desc">{post.description}</p>

                  <p className="type">
                    Type: <span>{post.type}</span>
                  </p>

                  {/* ----- NOTE ----- */}
                  {post.type === "note" && post.fileUrl && (
                    <a
                      className="download-btn"
                      href={`https://studyshare-backend-1.onrender.com${post.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download Note
                    </a>
                  )}

                  {/* ----- VIDEO ----- */}
                  {post.type === "video" && post.link && (
                    <a
                      className="video-btn"
                      href={post.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch Video
                    </a>
                  )}

                  {/* ----- WORKSHOP ----- */}
                  {post.type === "workshop" && post.link && (
                    <a
                      className="link-btn"
                      href={post.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Workshop
                    </a>
                  )}

                  {/* Buttons */}
                  <div className="btn-row">
                    <button
                      className="edit-btn"
                      onClick={() => startEdit(post)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deletePost(post._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
