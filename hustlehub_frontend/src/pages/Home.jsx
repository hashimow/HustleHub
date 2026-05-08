import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="hero-badge">Learn faster with trusted guidance</p>

          <h1>
            Find mentors and resources that help you grow in tech.
          </h1>

          <p className="hero-text">
            Hustle Hub helps learners discover developer mentors, useful books,
            and saved resources in one simple place.
          </p>

          <div className="hero-buttons">
            <Link to="/mentors" className="btn btn-orange">
              Explore Mentors
            </Link>

            <Link to="/books" className="btn btn-light">
              Browse Books
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card large-card">
            <span className="card-tag">Mentorship</span>
            <h3>Connect with real developers</h3>
            <p>Explore GitHub profiles and learn from experienced builders.</p>
          </div>

          <div className="hero-card small-card">
            <h4>Books</h4>
            <p>Find helpful learning materials.</p>
          </div>

          <div className="hero-card small-card floating-card">
            <h4>Favorites</h4>
            <p>Save mentors and books for later.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;