import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();
    setError("");

    fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          navigate("/mentors");
        } else {
          setError(data.error || "Signup failed");
        }
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      });
  }

  return (
    <section className="auth-page">
      <div className="auth-container">
        <h1>Create Account</h1>

        <p className="auth-text">
          Join Hustle Hub and start saving mentors and books.
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form className="auth-form" onSubmit={handleSignup}>
          <input
            id="full_name"
            name="full_name"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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

          <button type="submit">Get Started</button>
        </form>
      </div>
    </section>
  );
}

export default Signup;