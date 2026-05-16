import { NavLink, Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

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
        {token ? (
          <>
            <span className="btn btn-light">Hi, {user?.full_name}</span>
            <button className="btn btn-orange" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-light">Log In</Link>
            <Link to="/signup" className="btn btn-orange">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;