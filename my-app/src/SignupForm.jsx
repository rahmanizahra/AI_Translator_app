import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import styles from "./SignupForm.module.css"; // Import your custom CSS module
import App from "./App";
function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    } else {
      setIsSignedUp(true);
    }
  };

  return (
    <>
      {!isSignedUp && (
        <div className={`container ${styles.signupContainer}`}>
          <div className={`card ${styles.signupForm}`}>
            <h2 className="card-title text-center fw-bold">Sign Up</h2>
            <form
              onSubmit={handleSubmit}
              style={{ backgroundColor: "transparent" }}
            >
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="form-label"
                  style={{ width: "100%" }}
                >
                  Full Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label"
                  style={{ width: "100%" }}
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label"
                  style={{ width: "100%" }}
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className={`form-control ${
                    passwordError ? "is-invalid" : ""
                  }`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(""); // Clear password error when input changes
                  }}
                  required
                />
                {passwordError && (
                  <div className="invalid-feedback">{passwordError}</div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}
      {isSignedUp && <App name={name} />}
    </>
  );
}

export default SignupForm;
