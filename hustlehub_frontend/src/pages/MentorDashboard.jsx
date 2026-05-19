import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import API from "../services/api";

function MentorDashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bio: "",
    niche: "",
    skills: "",
    availability: "",
    price: "",
    linkedin_url: "",
    portfolio_url: "",
    contact_email: "",
  });

  const [message, setMessage] = useState("");

  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    fetch(`${API}/api/mentor-profile/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setFormData({
            bio: data.bio || "",
            niche: data.niche || "",
            skills: data.skills || "",
            availability: data.availability || "",
            price: data.price || "",
            linkedin_url: data.linkedin_url || "",
            portfolio_url: data.portfolio_url || "",
            contact_email: data.contact_email || "",
          });
        }
      })
      .catch(() => {
        setMessage("Could not load mentor profile.");
      });
  }, [token]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${API}/api/mentor-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.mentor_profile) {
          const savedUser = JSON.parse(localStorage.getItem("user"));

          if (savedUser) {
            savedUser.role = "mentor";
            localStorage.setItem("user", JSON.stringify(savedUser));
          }

          setMessage("You are now a mentor!");

          setTimeout(() => {
            navigate("/hustle-mentors");
          }, 1000);
        } else {
          setMessage(data.error || "Something went wrong");
        }
      })
      .catch(() => {
        setMessage("Could not save mentor profile.");
      });
  }

  return (
    <section className="mentor-dashboard-page">
      <div className="container">
        <div className="page-header">
          <p className="section-label">Mentor Application</p>
          <h1 className="page-title">Create Your Mentor Profile</h1>
          <p className="page-text">
            Fill in your mentor details. After saving, your profile will appear
            on the Hustle Hub mentors page.
          </p>
        </div>

        {message && <p className="success-message">{message}</p>}

        <form className="mentor-dashboard-form" onSubmit={handleSubmit}>
          <textarea
            name="bio"
            placeholder="Short mentor bio"
            value={formData.bio}
            onChange={handleChange}
          />

          <input
            name="niche"
            type="text"
            placeholder="Niche e.g. React, Flask, Data Science"
            value={formData.niche}
            onChange={handleChange}
          />

          <input
            name="skills"
            type="text"
            placeholder="Skills e.g. JavaScript, Python, SQL"
            value={formData.skills}
            onChange={handleChange}
          />

          <input
            name="availability"
            type="text"
            placeholder="Availability e.g. Weekends, Evenings"
            value={formData.availability}
            onChange={handleChange}
          />

          <input
            name="price"
            type="text"
            placeholder="Price e.g. Free, $10/session"
            value={formData.price}
            onChange={handleChange}
          />

          <input
            name="linkedin_url"
            type="text"
            placeholder="LinkedIn URL"
            value={formData.linkedin_url}
            onChange={handleChange}
          />


          <input
            name="contact_email"
            type="email"
            placeholder="Contact email"
            value={formData.contact_email}
            onChange={handleChange}
          />

          <button type="submit">Apply as Mentor</button>
        </form>
      </div>
    </section>
  );
}

export default MentorDashboard;