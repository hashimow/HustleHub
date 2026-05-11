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
        <h1 className="page-title">Developer Mentors</h1>

        <div className="mentors-grid">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="mentor-card">
              <img src={mentor.avatar_url} alt={mentor.login} />

              <h3>{mentor.name}</h3>

              <p>@{mentor.login}</p>

              <a
                href={mentor.html_url}
                target="_blank"
                rel="noreferrer"
              >
                View GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Mentors;