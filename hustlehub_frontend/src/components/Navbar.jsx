import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-mark">H</span>
        <span>Hustle <strong>Hub</strong></span>
      </Link>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/mentors">Mentors</NavLink>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </div>

      <div className="nav-actions">
        <Link to="/login" className="btn btn-light">Log In</Link>
        <Link to="/signup" className="btn btn-orange">Get Started</Link>
      </div>
    </nav>
  );
}

export default Navbar;