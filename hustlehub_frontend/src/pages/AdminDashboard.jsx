import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    if (!token || user?.role !== "admin") return;

    fetchAdminData();
  }, []);

  function fetchAdminData() {
    fetch(`${API}/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : []));

    fetch(`${API}/api/admin/mentor-profiles`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMentors(Array.isArray(data) ? data : []));

    fetch(`${API}/api/admin/reviews`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []));
  }

  function deleteReview(id) {
    fetch(`${API}/api/admin/reviews/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message || "Review deleted");
        setReviews(reviews.filter((review) => review.id !== id));
      });
  }

  function deleteMentor(id) {
    fetch(`${API}/api/admin/mentor-profiles/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message || "Mentor profile deleted");
        setMentors(mentors.filter((mentor) => mentor.id !== id));
      });
  }

  if (!token || user?.role !== "admin") {
    return (
      <section className="admin-page">
        <div className="container">
          <p className="empty-text">
            Admin access only. Please login with an admin account.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Hustle Hub Admin Dashboard</h1>
          <p className="page-text">
            Manage users, mentor profiles, and reviews from one place.
          </p>
        </div>

        {message && <p className="success-message">{message}</p>}

        <div className="admin-stats">
          <div className="admin-stat-card">
            <h3>{users.length}</h3>
            <p>Total Users</p>
          </div>

          <div className="admin-stat-card">
            <h3>{mentors.length}</h3>
            <p>Mentor Profiles</p>
          </div>

          <div className="admin-stat-card">
            <h3>{reviews.length}</h3>
            <p>Reviews</p>
          </div>
        </div>

        <div className="admin-section">
          <h2>Users</h2>

          <div className="admin-table">
            {users.map((item) => (
              <div key={item.id} className="admin-row">
                <span>{item.username}</span>
                <span>{item.email}</span>
                <span>{item.role}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-section">
          <h2>Mentor Profiles</h2>

          <div className="admin-table">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="admin-row">
                <span>{mentor.full_name}</span>
                <span>{mentor.niche || "No niche"}</span>
                <span>⭐ {mentor.average_rating || 0}</span>

                <button
                  className="admin-delete-btn"
                  onClick={() => deleteMentor(mentor.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-section">
          <h2>Reviews</h2>

          <div className="admin-table">
            {reviews.map((review) => (
              <div key={review.id} className="admin-row">
                <span>@{review.username}</span>
                <span>⭐ {review.rating}</span>
                <span>{review.comment || "No comment"}</span>

                <button
                  className="admin-delete-btn"
                  onClick={() => deleteReview(review.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;