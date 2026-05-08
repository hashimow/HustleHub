function SearchInput({ placeholder = "Search..." }) {
  return (
    <div className="search-box">
      <input type="text" placeholder={placeholder} />
      <button>Search</button>
    </div>
  );
}

export default SearchInput;