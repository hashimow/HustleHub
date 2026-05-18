import { useEffect, useState } from "react";
import getBooks from "../services/booksApi";
import Loading from "../components/Loading";
import API from "../services/api";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("programming");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch books from Open Library
  useEffect(() => {
    setLoading(true);

    getBooks(query).then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, [query]);

  // Fetch saved favorites
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
        author: book.author_name
          ? book.author_name[0]
          : "Unknown Author",
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

  // Search Open Library
  function handleSearch(e) {
    e.preventDefault();

    if (search.trim()) {
      setQuery(search);
    }
  }

  if (loading) return <Loading text="Loading books..." />;

  return (
    <section className="books-page">
      <div className="container">
        <div className="page-header">
          <p className="section-label">Books Library</p>

          <h1 className="page-title">
            Find Any Book
          </h1>

          <p className="page-text">
            Search books from Open Library and save your favorites.
          </p>
        </div>

        <form className="mentor-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search any book..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit">
            Search
          </button>
        </form>

        <div className="books-grid">
          {books.map((book) => {
            const isSaved = favorites.find(
              (f) =>
                f.item_id === book.key &&
                f.type === "book"
            );

            return (
              <div key={book.key} className="book-card">

                <img
                  src={getBookCover(book)}
                  alt={book.title}
                />

                <div className="book-content">

                  <h3>{book.title}</h3>

                  <p className="book-author">
                    {book.author_name
                      ? book.author_name[0]
                      : "Unknown Author"}
                  </p>

                  <p className="book-year">
                    First Published:
                    {" "}
                    {book.first_publish_year || "N/A"}
                  </p>

                  <div className="book-card-buttons">

                    <a
                      href={`https://openlibrary.org${book.key}`}
                      target="_blank"
                      rel="noreferrer"
                      className="book-link"
                    >
                      View Book
                    </a>

                    <button
                      className="favorite-btn"
                      onClick={() => addFavorite(book)}
                      disabled={!!isSaved}
                    >
                      {isSaved
                        ? "Saved"
                        : "Save Favorite"}
                    </button>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {books.length === 0 && (
          <p className="empty-text">
            No books found.
          </p>
        )}
      </div>
    </section>
  );
}

export default Books;