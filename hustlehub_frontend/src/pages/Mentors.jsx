import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import getMentors from "../services/githubApi";

function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState("");

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("mentorFavorites");

    if (savedFavorites) {
      return JSON.parse(savedFavorites);
    }

    return [];
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMentors() {
      const data = await getMentors();

      setMentors(data);
      setLoading(false);
    }

    loadMentors();
  }, []);

  function addFavorite(mentor) {
    const newFavorite = {
      id: mentor.id,
      login: mentor.login,
      name: mentor.name || mentor.login,
      avatar: mentor.avatar_url,
      bio: mentor.bio || "This mentor has no bio yet.",
    };

    const alreadySaved = favorites.find(
      (item) => item.id === mentor.id
    );

    if (alreadySaved) {
      return;
    }

    const updatedFavorites = [...favorites, newFavorite];

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "mentorFavorites",
      JSON.stringify(updatedFavorites)
    );
  }

  const filteredMentors = mentors.filter((mentor) => {
    const name = mentor.name || "";
    const username = mentor.login || "";
    const bio = mentor.bio || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      username.toLowerCase().includes(search.toLowerCase()) ||
      bio.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (loading) {
    return <h2 className="page-message">Loading mentors...</h2>;
  }

  return (
    <section className="mentors-page">
      <div className="container">
        <div className="page-header">
          <p className="section-label">Mentor Discovery</p>

          <h1 className="page-title">
            Find Developer Mentors
          </h1>

          <p className="page-text">
            Search real GitHub developers by name,
            username, or bio.
          </p>
        </div>

        <div className="mentor-search">
          <input
            type="text"
            placeholder="Search mentors..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="mentors-grid">
          {filteredMentors.map((mentor) => {
            const isSaved = favorites.find(
              (item) => item.id === mentor.id
            );

            return (
              <div
                key={mentor.id}
                className="mentor-card"
              >
                <img
                  src={mentor.avatar_url}
                  alt={mentor.login}
                />

                <h3>{mentor.name || mentor.login}</h3>

                <p className="mentor-username">
                  @{mentor.login}
                </p>

                <p className="mentor-bio">
                  {mentor.bio ||
                    "This mentor has no bio yet."}
                </p>

                <div className="mentor-info">
                  <span>
                    Repos: {mentor.public_repos}
                  </span>

                  <span>
                    Followers: {mentor.followers}
                  </span>
                </div>

                <div className="mentor-card-buttons">
                  <Link
                    to={`/mentors/${mentor.login}`}
                  >
                    View Profile
                  </Link>

                  <button
                    className="favorite-btn"
                    onClick={() =>
                      addFavorite(mentor)
                    }
                  >
                    {isSaved
                      ? "Saved"
                      : "Save Favorite"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredMentors.length === 0 && (
          <p className="empty-text">
            No mentors found.
          </p>
        )}
      </div>
    </section>
  );
}

export default Mentors;