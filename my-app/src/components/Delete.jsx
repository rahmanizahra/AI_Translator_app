import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./SignupForm.module.css"; // Assuming you have a CSS module for styling

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleDeleteAccount = async () => {
    try {
      // Make API call to delete account
      const response = await fetch("http://localhost:3001/api/user/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" ,Authorization: "Bearer " + localStorage.getItem("token") },
        body: JSON.stringify({ username}), // Make sure to include the password if required by your API
      });

      const data = await response.json();

      if (!response.ok ) {
        // Handle error from API call
        setError(data.message || "Invalid username or password");
        setSuccessMessage("");
        return;
      }
      // Account deletion successful
      setSuccessMessage("Account deletion successful!");
      setError("");
     
    } catch (error) {
      // Handle errors from the API call or other errors
      console.error("Error during account deletion:", error);
      setError("An error occurred. Please try again.");
      setSuccessMessage("");
    }
  };


  return (
    <div className={`container ${styles.signupContainer}`}>
      <div className={`card ${styles.signupForm}`}>
        <h2 className="card-title text-center fw-bold">Delete Account</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            required
          />
        </div>
    
        <button className="btn btn-danger mt-3" onClick={handleDeleteAccount}>
          Delete Account
        </button>
        <div style={{margin:"auto"}}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </div>
        <p style={{ margin: "auto", paddingTop: "10px" }}>
          <button
            className={`btn btn-link ${styles.link}`}
            onClick={() => navigate("/")}
          >
            Back to Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default DeleteAccount;
