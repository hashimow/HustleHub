import { NavLink, Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-mark">H</span>

        <span>
          Hustle <strong>Hub</strong>
        </span>
      </Link>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/mentors">Mentors</NavLink>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </div>

      <div className="nav-actions">
        {user ? (
          <div className="user-menu">

            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>

            <span className="nav-user">
              {user.username}
            </span>

            <button
              className="btn btn-light logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-light">
              Log In
            </Link>

            <Link to="/signup" className="btn btn-orange">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
