


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [preview, setPreview] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://studyshare-backend-1.onrender.com/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
        setBio(res.data.bio || "");
        setPreview(res.data.profilePic || "");
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("bio", bio);

      if (profilePicFile) {
        formData.append("profilePic", profilePicFile);
      }

      const res = await axios.put(
        "https://studyshare-backend-1.onrender.com/api/users/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser(res.data);
      setPreview(res.data.profilePic);
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Profile updated successfully!");
    } catch (err) {
      console.log(err);
      alert("Profile update failed");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePicFile(file);
    setPreview(URL.createObjectURL(file));
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>

      <div className="profile-card">
        <img
          src={preview || "https://via.placeholder.com/120"}
          alt="Profile"
          className="profile-img"
        />

        <h3>{user.name}</h3>
        <p>{user.email}</p>

        <form onSubmit={handleUpdate} className="profile-form">
          <label>Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <label>Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
