import { Link } from "react-router-dom";

function Button({ children, to, type = "button", variant = "orange" }) {
  if (to) {
    return (
      <Link to={to} className={`btn btn-${variant}`}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={`btn btn-${variant}`}>
      {children}
    </button>
  );
}

export default Button;