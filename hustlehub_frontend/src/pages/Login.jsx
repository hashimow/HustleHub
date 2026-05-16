import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:5000";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/favorites");
        } else {
          setError(data.error);
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <section className="auth-page">
      <div className="auth-container">
        <h1>Welcome Back</h1>

        <p className="auth-text">
          Log in to continue exploring mentors and books.
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Log In</button>
        </form>
      </div>
    </section>
  );
}

export default Login;