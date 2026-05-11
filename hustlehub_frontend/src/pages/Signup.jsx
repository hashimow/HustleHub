function Signup() {
  return (
    <section className="auth-page">
      <div className="auth-container">
        <h1>Create Account</h1>

        <p className="auth-text">
          Join Hustle Hub and start saving mentors
          and books.
        </p>

        <form className="auth-form">
          <input
            type="text"
            placeholder="Full Name"
          />

          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button type="submit">
            Get Started
          </button>
        </form>
      </div>
    </section>
  );
}

export default Signup;