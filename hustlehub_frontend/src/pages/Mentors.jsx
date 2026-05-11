import { useEffect, useState } from "react";
import getMentors from "../services/githubApi";

function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMentors() {
      const data = await getMentors();
      setMentors(data);
      setLoading(false);
    }

    loadMentors();
  }, []);

  if (loading) {
    return <h2 className="page-message">Loading mentors...</h2>;
  }

  return (
    <section className="mentors-page">
      <div className="container">
        <div className="page-header">
          <p className="section-label">Mentor Discovery</p>
          <h1 className="page-title">Find Developer Mentors</h1>
          <p className="page-text">
            Explore real GitHub developers and visit their profiles to learn
            from their work.
          </p>
        </div>

        <div className="mentors-grid">
          {mentors.map((mentor) => (
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

              <a href={mentor.html_url} target="_blank" rel="noreferrer">
                View Profile
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Mentors;