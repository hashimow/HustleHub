function EmptyState({ text }) {
  return (
    <div className="state-box">
      <h2>No results found</h2>
      <p>{text}</p>
    </div>
  );
}

export default EmptyState;