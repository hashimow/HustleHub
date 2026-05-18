import { useEffect, useState } from "react";
import getBooks from "../services/booksApi";
import Loading from "../components/Loading";

const API = "http://127.0.0.1:5000";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getBooks().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

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

  function getBookCover(book) {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
    }

    return "https://placehold.co/250x340?text=No+Image";
  }

  function addFavorite(book) {
    if (!token) {
      alert("Please login to save favorites!");
      return;
    }

    fetch(`${API}/api/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        item_id: book.key,
        item_type: "book",
        title: book.title,
        author: book.author_name ? book.author_name[0] : "Unknown Author",
        cover: getBookCover(book),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.favorite) {
          setFavorites([...favorites, data.favorite]);
        }
      });
  }

  const filteredBooks = books.filter((book) => {
    const title = book.title || "";
    const author = book.author_name ? book.author_name[0] : "";

    return (
      title.toLowerCase().includes(search.toLowerCase()) ||
      author.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (loading) return <Loading text="Loading books..." />;

  return (
    <section className="books-page">
      <div className="container">
        <div className="page-header">
          <p className="section-label">Books Library</p>
          <h1 className="page-title">Programming Books</h1>
          <p className="page-text">
            Search programming books and save the ones you like.
          </p>
        </div>

        <div className="mentor-search">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="books-grid">
          {filteredBooks.map((book) => {
            const isSaved = favorites.find(
              (f) => f.item_id === book.key && f.type === "book"
            );

            return (
              <div key={book.key} className="book-card">
                <img src={getBookCover(book)} alt={book.title} />
                <div className="book-content">
                  <h3>{book.title}</h3>
                  <p className="book-author">
                    {book.author_name ? book.author_name[0] : "Unknown Author"}
                  </p>
                  <p className="book-year">
                    First Published: {book.first_publish_year || "N/A"}
                  </p>
                  <button
                    className="favorite-btn"
                    onClick={() => addFavorite(book)}
                  >
                    {isSaved ? "Saved" : "Save Favorite"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredBooks.length === 0 && (
          <p className="empty-text">No books found.</p>
        )}
      </div>
    </section>
  );
}

export default Books;