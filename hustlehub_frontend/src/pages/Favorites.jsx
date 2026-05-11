import { useEffect, useState } from "react";

function Favorites() {
  const [bookFavorites, setBookFavorites] = useState([]);
  const [mentorFavorites, setMentorFavorites] = useState([]);

  useEffect(() => {
    const savedBooks = localStorage.getItem("bookFavorites");
    const savedMentors = localStorage.getItem("mentorFavorites");

    if (savedBooks) {
      setBookFavorites(JSON.parse(savedBooks));
    }

    if (savedMentors) {
      setMentorFavorites(JSON.parse(savedMentors));
    }
  }, []);

  function removeBook(bookKey) {
    const updatedBooks = bookFavorites.filter((book) => book.key !== bookKey);

    setBookFavorites(updatedBooks);
    localStorage.setItem("bookFavorites", JSON.stringify(updatedBooks));
  }

  function removeMentor(mentorId) {
    const updatedMentors = mentorFavorites.filter(
      (mentor) => mentor.id !== mentorId
    );

    setMentorFavorites(updatedMentors);
    localStorage.setItem("mentorFavorites", JSON.stringify(updatedMentors));
  }

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

        {bookFavorites.length === 0 && mentorFavorites.length === 0 && (
          <p className="empty-text">You have not saved any favorites yet.</p>
        )}

        <h2 className="repo-title">Saved Mentors</h2>

        <div className="mentors-grid">
          {mentorFavorites.map((mentor) => (
            <div key={mentor.id} className="mentor-card">
              <img src={mentor.avatar} alt={mentor.login} />

              <h3>{mentor.name}</h3>

              <p className="mentor-username">@{mentor.login}</p>

              <p className="mentor-bio">{mentor.bio}</p>

              <button
                className="remove-btn"
                onClick={() => removeMentor(mentor.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <h2 className="repo-title">Saved Books</h2>

        <div className="books-grid">
          {bookFavorites.map((book) => (
            <div key={book.key} className="book-card">
              <img src={book.cover} alt={book.title} />

              <div className="book-content">
                <h3>{book.title}</h3>

                <p className="book-author">{book.author}</p>

                <button
                  className="remove-btn"
                  onClick={() => removeBook(book.key)}
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