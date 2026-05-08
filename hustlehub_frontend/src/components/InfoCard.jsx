import { Link } from "react-router-dom";

function InfoCard({ icon, title, text, linkText, to }) {
  return (
    <Link to={to} className="category-card">
      <span className="category-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <strong>{linkText}</strong>
    </Link>
  );
}

export default InfoCard;