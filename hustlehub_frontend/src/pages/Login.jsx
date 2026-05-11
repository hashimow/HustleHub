function Login() {
  return (
    <section className="auth-page">
      <div className="auth-container">
        <h1>Welcome Back</h1>

        <p className="auth-text">
          Log in to continue exploring mentors and books.
        </p>

        <form className="auth-form">
          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="password"
            placeholder="Password"
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