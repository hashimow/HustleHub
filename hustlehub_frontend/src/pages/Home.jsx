import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="hero-badge">Learn faster with trusted guidance</p>

            <h1>Find mentors and resources that help you grow in tech.</h1>

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

      <section className="home-discovery">
        <div className="container">
          <div className="section-heading">
            <p className="section-label">Start exploring</p>
            <h2>Choose what you want to discover first</h2>
            <p>
              Search for mentors, browse learning books, or open your saved
              favorites when you come back later.
            </p>
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search mentors, books, skills, or topics..."
            />
            <button>Search</button>
          </div>

          <div className="category-grid">
            <Link to="/mentors" className="category-card">
              <span className="category-icon">👨‍💻</span>
              <h3>Mentors</h3>
              <p>
                Discover developers, explore their GitHub profiles, and learn
                from people already building in tech.
              </p>
              <strong>View mentors →</strong>
            </Link>

            <Link to="/books" className="category-card">
              <span className="category-icon">📚</span>
              <h3>Books</h3>
              <p>
                Browse useful books and learning materials that can help you
                improve your skills step by step.
              </p>
              <strong>Browse books →</strong>
            </Link>

            <Link to="/favorites" className="category-card">
              <span className="category-icon">⭐</span>
              <h3>Favorites</h3>
              <p>
                Save your favorite mentors and books so you can quickly find
                them again when you need them.
              </p>
              <strong>Open favorites →</strong>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;