import Button from "../components/Button";
import InfoCard from "../components/InfoCard";
import SearchInput from "../components/SearchInput";

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
              <Button to="/mentors">Explore Mentors</Button>
              <Button to="/books" variant="light">Browse Books</Button>
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

          <SearchInput placeholder="Search mentors, books, skills, or topics..." />

          <div className="category-grid">
            <InfoCard
              icon="👨‍💻"
              title="Mentors"
              text="Discover developers, explore their GitHub profiles, and learn from people already building in tech."
              linkText="View mentors →"
              to="/mentors"
            />

            <InfoCard
              icon="📚"
              title="Books"
              text="Browse useful books and learning materials that can help you improve your skills step by step."
              linkText="Browse books →"
              to="/books"
            />

            <InfoCard
              icon="⭐"
              title="Favorites"
              text="Save your favorite mentors and books so you can quickly find them again when you need them."
              linkText="Open favorites →"
              to="/favorites"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

