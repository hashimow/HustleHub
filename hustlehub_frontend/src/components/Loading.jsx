function Loading({ text }) {
  return (
    <div className="state-box">
      <div className="loader"></div>
      <p>{text}</p>
    </div>
  );
}

export default Loading;