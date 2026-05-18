import { useEffect, useState } from "react";
import API from "../services/api";


const API = "http://127.0.0.1:5000";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setFavorites([]);
      return;
    }

    fetch(`${API}/api/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFavorites(data);
        } else {
          setFavorites([]);
        }
      });
  }, [token]);

  function removeFavorite(id) {
    fetch(`${API}/api/favorites/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      setFavorites(favorites.filter((f) => f.id !== id));
    });
  }

  const mentors = favorites.filter((f) => f.type === "mentor");
  const books = favorites.filter((f) => f.type === "book");

  return (
    <section className="favorites-page">
      <div className="container">
        <div className="page-header">
          <p className="section-label">Saved Items</p>
          <h1 className="page-title">Your Favorites</h1>
          <p className="page-text">
            These are the mentors and books you saved for later.
          </p>
        </div>

        {favorites.length === 0 && (
          <p className="empty-text">You have not saved any favorites yet.</p>
        )}

        <h2 className="repo-title">Saved Mentors</h2>
        <div className="mentors-grid">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="mentor-card">
              <img src={mentor.avatar} alt={mentor.name} />
              <h3>{mentor.name}</h3>
              <p className="mentor-username">@{mentor.login}</p>
              <p className="mentor-bio">
                {mentor.bio || "This mentor has no bio yet."}
              </p>
              <button
                className="remove-btn"
                onClick={() => removeFavorite(mentor.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <h2 className="repo-title">Saved Books</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <img
                src={book.cover || "https://placehold.co/250x340?text=Book"}
                alt={book.title}
              />
              <div className="book-content">
                <h3>{book.title}</h3>
                <p className="book-author">{book.author || "Unknown Author"}</p>
                <button
                  className="remove-btn"
                  onClick={() => removeFavorite(book.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Favorites;