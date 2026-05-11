const booksUrl = "https://openlibrary.org/search.json?q=javascript";

async function getBooks() {
  const response = await fetch(booksUrl);

  const data = await response.json();

  return data.docs.slice(0, 12);
}

export default getBooks;