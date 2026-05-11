import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function MentorProfile() {
  const { username } = useParams();

  const [mentor, setMentor] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const mentorResponse = await fetch(
        `https://api.github.com/users/${username}`
      );

      const mentorData = await mentorResponse.json();

      const repoResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
      );

      const repoData = await repoResponse.json();

      setMentor(mentorData);
      setRepos(repoData);
      setLoading(false);
    }

    loadProfile();
  }, [username]);

  if (loading) {
    return <h2 className="page-message">Loading profile...</h2>;
  }

  if (!mentor || mentor.message === "Not Found") {
    return <h2 className="page-message">Mentor not found.</h2>;
  }

  return (
    <section className="profile-page">
      <div className="container">
        <Link to="/mentors" className="back-link">
          ← Back to Mentors
        </Link>

        <div className="profile-card">
          <img src={mentor.avatar_url} alt={mentor.login} />

          <div>
            <h1>{mentor.name || mentor.login}</h1>

            <p className="mentor-username">@{mentor.login}</p>

            <p className="profile-bio">
              {mentor.bio || "This mentor has no bio yet."}
            </p>

            <div className="mentor-info profile-info">
              <span>Repos: {mentor.public_repos}</span>

              <span>Followers: {mentor.followers}</span>

              <span>Following: {mentor.following}</span>
            </div>

            <a
              href={mentor.html_url}
              target="_blank"
              rel="noreferrer"
            >
              View GitHub Profile
            </a>
          </div>
        </div>

        <h2 className="repo-title">Recent Repositories</h2>

        <div className="repo-grid">
          {repos.map((repo) => (
            <div key={repo.id} className="repo-card">
              <h3>{repo.name}</h3>

              <p>
                {repo.description || "No description available."}
              </p>

              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
              >
                View Repo
              </a>
            </div>
          ))}
        </div>

        {repos.length === 0 && (
          <p className="empty-text">No repositories found.</p>
        )}
      </div>
    </section>
  );
}

export default MentorProfile;