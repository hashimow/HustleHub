import { useEffect, useState } from "react";

import getBooks from "../services/booksApi";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooks() {
      const data = await getBooks();

      setBooks(data);
      setLoading(false);
    }

    loadBooks();
  }, []);

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
            Discover useful books and learning materials for developers.
          </p>
        </div>

        <div className="books-grid">
          {books.map((book, index) => (
            <div key={index} className="book-card">
              <img
                src={
                  book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                    : "https://via.placeholder.com/250x340?text=No+Image"
                }
                alt={book.title}
              />

              <h3>{book.title}</h3>

              <p className="book-author">
                {book.author_name
                  ? book.author_name[0]
                  : "Unknown Author"}
              </p>

              <p className="book-year">
                First Published: {book.first_publish_year || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Books;