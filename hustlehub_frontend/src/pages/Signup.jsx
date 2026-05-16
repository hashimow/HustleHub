import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:5000";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();

    fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        username:  fullName.toLowerCase().replace(" ", ""),
        email:     email,
        password:  password,
      }),
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
        <h1>Create Account</h1>

        <p className="auth-text">
          Join Hustle Hub and start saving mentors and books.
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form className="auth-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

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

          <button type="submit">Get Started</button>
        </form>
      </div>
    </section>
  );
}

export default Signup;