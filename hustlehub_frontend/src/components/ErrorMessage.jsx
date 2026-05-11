function ErrorMessage({ text }) {
  return (
    <div className="state-box">
      <h2>Something went wrong</h2>
      <p>{text}</p>
    </div>
  );
}

export default ErrorMessage;