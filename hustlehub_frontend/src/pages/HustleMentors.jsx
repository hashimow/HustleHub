import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Loading from "../components/Loading";

function HustleMentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState({});

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    loadMentors();
  }, []);

  function loadMentors() {
    fetch(`${API}/api/mentor-profiles`)
      .then((res) => res.json())
      .then((data) => {
        setMentors(data);
        setLoading(false);
      })
      .catch(() => {
        setMentors([]);
        setLoading(false);
      });
  }

  function handleReviewChange(mentorId, field, value) {
    setReviewData({
      ...reviewData,
      [mentorId]: {
        ...reviewData[mentorId],
        [field]: value,
      },
    });
  }

  function submitReview(mentorId) {
    if (!token) {
      alert("Please login to leave a review");
      navigate("/login");
      return;
    }

    const currentReview = reviewData[mentorId];

    if (!currentReview || !currentReview.rating) {
      alert("Please choose a star rating");
      return;
    }

    fetch(`${API}/api/mentor-profiles/${mentorId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        rating: currentReview.rating,
        comment: currentReview.comment || "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.review) {
          alert("Review added!");

          setReviewData({
            ...reviewData,
            [mentorId]: {
              rating: "",
              comment: "",
            },
          });

          loadMentors();
        } else {
          alert(data.error || "Could not add review");
        }
      });
  }

  function editProfile() {
    navigate("/mentor-dashboard");
  }

  if (loading) return <Loading text="Loading Hustle Hub mentors..." />;

  return (
    <section className="hustle-mentors-page">
      <div className="container">
        <div className="page-header hustle-header">
            <br></br>

          <h1 className="page-title">Platform Mentors</h1>

          <p className="page-text hustle-page-text">
            Learn from mentors who created profiles directly inside Hustle Hub.
          </p>
        </div>

        {mentors.length === 0 && (
          <p className="empty-text">
            No Hustle Hub mentors yet. Apply from the mentors page.
          </p>
        )}

        <div className="hustle-mentors-grid">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="hustle-mentor-card">
              <div className="hustle-mentor-top">
                <img
                  src={
                    mentor.profile_image ||
                    "https://placehold.co/90x90?text=Mentor"
                  }
                  alt={mentor.username}
                />

                <div className="mentor-top-info">
                  <div className="mentor-name-row">
                    <h3>{mentor.full_name}</h3>

                    {user && user.id === mentor.user_id && (
                      <button className="edit-mini-btn" onClick={editProfile}>
                        Edit
                      </button>
                    )}
                  </div>

                  <p className="mentor-username">@{mentor.username}</p>

                  <p className="mentor-rating">
                    ⭐ {mentor.average_rating || 0} (
                    {mentor.review_count || 0} reviews)
                  </p>
                </div>
              </div>

              <p className="mentor-bio small-bio">
                {mentor.bio || "This mentor has not added a bio yet."}
              </p>

              <div className="mentor-tags">
                <span>{mentor.niche || "General Mentor"}</span>
                <span>{mentor.availability || "Availability not added"}</span>
                <span>{mentor.price || "Price not added"}</span>
              </div>

              <div className="mentor-card-buttons">
                {mentor.contact_email && (
                  <a href={`mailto:${mentor.contact_email}`}>Contact</a>
                )}

                {mentor.linkedin_url && (
                  <a
                    href={mentor.linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                )}
              </div>

              {user?.id !== mentor.user_id && (
                <div className="review-box">
                  <select
                    value={reviewData[mentor.id]?.rating || ""}
                    onChange={(e) =>
                      handleReviewChange(mentor.id, "rating", e.target.value)
                    }
                  >
                    <option value="">Rate mentor</option>
                    <option value="5">⭐⭐⭐⭐⭐ 5</option>
                    <option value="4">⭐⭐⭐⭐ 4</option>
                    <option value="3">⭐⭐⭐ 3</option>
                    <option value="2">⭐⭐ 2</option>
                    <option value="1">⭐ 1</option>
                  </select>

                  <textarea
                    placeholder="Leave a short comment..."
                    value={reviewData[mentor.id]?.comment || ""}
                    onChange={(e) =>
                      handleReviewChange(mentor.id, "comment", e.target.value)
                    }
                  />

                  <button onClick={() => submitReview(mentor.id)}>
                    Submit Review
                  </button>
                </div>
              )}

              <div className="mentor-reviews">
                <h4>Reviews</h4>

                {mentor.reviews && mentor.reviews.length > 0 ? (
                  mentor.reviews.map((review) => (
                    <div key={review.id} className="single-review">
                      <p className="review-user">@{review.username}</p>

                      <p className="review-stars">
                        {"⭐".repeat(review.rating)}
                      </p>

                      {review.comment && (
                        <p className="review-comment">{review.comment}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="no-reviews">No reviews yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HustleMentors;