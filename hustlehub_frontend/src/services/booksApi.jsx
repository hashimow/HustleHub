async function getBooks(query = "programming") {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
  );

  const data = await response.json();

  return data.docs || [];
}

export default getBooks;