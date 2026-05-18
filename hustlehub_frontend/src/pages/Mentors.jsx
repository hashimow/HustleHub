import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getMentors from "../services/githubApi";
import Loading from "../components/Loading";
import API from "../services/api";

function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("javascript developer");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch mentors from GitHub
  useEffect(() => {
    setLoading(true);
    getMentors(query).then((data) => {
      setMentors(data);
      setLoading(false);
    });
  }, [query]);

  // Fetch saved favorites from backend
  useEffect(() => {
    if (!token) {
      setFavorites([]);
      return;
    }

    fetch(`${API}/api/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFavorites(data);
        } else {
          setFavorites([]);
        }
      });
  }, [token]);

  // Save a mentor to favorites
  function addFavorite(mentor) {
    if (!token) {
      alert("Please login to save favorites!");
      return;
    }

    fetch(`${API}/api/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        item_id: String(mentor.id),
        item_type: "mentor",
        title: mentor.name || mentor.login,
        login: mentor.login,
        avatar: mentor.avatar_url,
        bio: mentor.bio,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.favorite) {
          setFavorites([...favorites, data.favorite]);
        }
      });
  }

  // Search GitHub when form is submitted
  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) {
      setQuery(search);
    }
  }

  if (loading) return <Loading text="Loading mentors..." />;

  return (
    <section className="mentors-page">
      <div className="container">
        <div className="page-header">
          <p className="section-label">Mentor Discovery</p>
          <h1 className="page-title">Find Developer Mentors</h1>
          <p className="page-text">
            Search real GitHub developers by name, username, or bio.
          </p>
        </div>

        <form className="mentor-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search mentors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="mentors-grid">
          {mentors.map((mentor) => {
            const isSaved = favorites.find(
              (f) => f.item_id === String(mentor.id) && f.type === "mentor"
            );

            return (
              <div key={mentor.id} className="mentor-card">
                <img src={mentor.avatar_url} alt={mentor.login} />
                <h3>{mentor.name || mentor.login}</h3>
                <p className="mentor-username">@{mentor.login}</p>
                <p className="mentor-bio">
                  {mentor.bio || "This mentor has no bio yet."}
                </p>
                <div className="mentor-info">
                  <span>Repos: {mentor.public_repos}</span>
                  <span>Followers: {mentor.followers}</span>
                </div>
                <div className="mentor-card-buttons">
                  <Link to={`/mentors/${mentor.login}`}>View Profile</Link>
                  <button
                    className="favorite-btn"
                    onClick={() => addFavorite(mentor)}
                    disabled={!!isSaved}
                  >
                    {isSaved ? " Saved" : "Save Favorite"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {mentors.length === 0 && (
          <p className="empty-text">No mentors found.</p>
        )}
      </div>
    </section>
  );
}

export default Mentors;