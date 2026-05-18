import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          alert("Login successful!");
          navigate("/mentors");
        } else {
          alert(data.error || "Login failed");
        }
      });
  }

  return (
    <section className="auth-page">
      <div className="auth-container">
        <h1>Welcome Back</h1>

        <p className="auth-text">
          Log in to continue exploring mentors and books.
        </p>

        <form className="auth-form" onSubmit={handleLogin}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Log In
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;