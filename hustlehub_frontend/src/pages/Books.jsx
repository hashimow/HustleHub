import { useEffect, useState } from "react";

import getBooks from "../services/booksApi";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("bookFavorites");

    if (savedFavorites) {
      return JSON.parse(savedFavorites);
    }

    return [];
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooks() {
      const data = await getBooks();

      setBooks(data);
      setLoading(false);
    }

    loadBooks();
  }, []);

  function getBookCover(book) {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
    }

    return "https://placehold.co/250x340?text=No+Image";
  }

  function addFavorite(book) {
    const newFavorite = {
      key: book.key,
      title: book.title,
      author: book.author_name ? book.author_name[0] : "Unknown Author",
      cover: getBookCover(book),
    };

    const alreadySaved = favorites.find((item) => item.key === book.key);

    if (alreadySaved) {
      return;
    }

    const updatedFavorites = [...favorites, newFavorite];

    setFavorites(updatedFavorites);
    localStorage.setItem("bookFavorites", JSON.stringify(updatedFavorites));
  }

  const filteredBooks = books.filter((book) => {
    const title = book.title || "";
    const author = book.author_name ? book.author_name[0] : "";

    return (
      title.toLowerCase().includes(search.toLowerCase()) ||
      author.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (loading) {
    return <h2 className="page-message">Loading books...</h2>;
  }

  return (
    <section className="books-page">
      <div className="container">
        <div className="page-header">
          <p className="section-label">Books Library</p>

          <h1 className="page-title">Programming Books</h1>



          <p className="page-text">
            Browse programming books from Open Library and find learning
            resources to support your tech journey.
          </p>
        </div>

        <div className="mentor-search">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="books-grid">
          {books.map((book) => (
            <div key={book.key} className="book-card">
              <img
                src={
                  book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                    : "https://via.placeholder.com/250x340?text=No+Image"
                }
                alt={book.title}
              />






              <div className="book-content">
                <h3>{book.title}</h3>

                <p className="book-author">
                  {book.author_name ? book.author_name[0] : "Unknown Author"}
                </p>

                <p className="book-year">
                  First Published: {book.first_publish_year || "N/A"}
                </p>

                <p className="book-editions">
                  Editions: {book.edition_count || 0}


                  
                </p>
              </div>
            </div>
          ))}
        </div>

        {books.length === 0 && (
          <p className="empty-text">No books found.</p>
        )}
      </div>
    </section>
  );
}

export default Books;