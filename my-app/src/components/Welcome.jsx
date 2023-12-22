import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./SignupForm.module.css"; // Assuming you have a CSS module for styling

const Welcome = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

 
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        console.log(data.token);
        navigate("/main");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      // Handle any other errors that may occur during the fetch
      console.error("Fetch error:", error);
      // Set an error state to display a message to the user if needed
      setError("An error occurred. Please try again later.");
    }
  };


  
  return (
    <div className={`container ${styles.signupContainer}`}>
      <div className={`card ${styles.signupForm}`}>
        <h3 className="card-title text-center fw-bold">
          Welcome to the AI_Translation App
        </h3>

        <div style={{ margin: "auto" }}>
          <div>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <label className="mx-1">
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div style={{ margin: "auto" }}>
          <button onClick={handleLogin}>Login</button>
        </div>

        <div style={{ margin: "auto", paddingTop: "10px" }}>
          <p>Don't have an account?</p>
          <button
            className="btn btn-link"
            onClick={() => navigate("/signup")}
            style={{ display: "block", margin: "auto" }}
          >
            Sign Up
          </button>
        </div>

        {/*<p style={{ margin: "auto", paddingTop: "10px" }}>
          <button className="btn btn-link" onClick={handleUpdatePassword}>
            Update Password
          </button>
        </p>
        <p style={{ margin: "auto", paddingTop: "10px" }}>
          <button className="btn btn-link" onClick={handleDelete}>
            Delete Account
          </button>
        </p>*/}
      </div>
    </div>
  );
};

export default Welcome;
