








import React, { useState } from "react";
import axios from "axios";
import "./MakePost.css";

const MakePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("image");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("type", type);

      // Image upload
      if (type === "image" && file) {
        formData.append("file", file);
      }

      // Video link / Workshop link
      if (type === "video" || type === "workshop") {
        formData.append("link", link);
      }

      await axios.post("https://studyshare-backend-1.onrender.com/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Post created successfully!");

      setTitle("");
      setDescription("");
      setLink("");
      setFile(null);
      setType("image");
    } catch (error) {
      alert(error.response?.data?.message || "Post creation failed");
    }
  };

  return (
    <div className="makepost-container">
      <div className="makepost-box">
        <h2 className="makepost-title">Create a New Post</h2>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="input-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="input-group">
            <label>Description</label>
            <textarea
              placeholder="Write something..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Post Type */}
          <div className="input-group">
            <label>Post Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="image">Image</option>
              <option value="video">Video (Link)</option>
              <option value="workshop">Workshop (Link)</option>
            </select>
          </div>

          {/* Image Upload */}
          {type === "image" && (
            <div className="input-group">
              <label>Upload Image (PNG / JPG / JPEG)</label>
              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </div>
          )}

          {/* Video Link */}
          {type === "video" && (
            <div className="input-group">
              <label>Video Link (YouTube)</label>
              <input
                type="text"
                placeholder="Enter video link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>
          )}

          {/* Workshop Link */}
          {type === "workshop" && (
            <div className="input-group">
              <label>Workshop / Meeting Link</label>
              <input
                type="text"
                placeholder="Enter workshop link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className="post-btn">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakePost;
