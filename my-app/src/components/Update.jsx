import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./SignupForm.module.css"; // Assuming you have a CSS module for styling

const Update = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

 const handleResetPassword = async () => {
   try {
     // Make API call to reset password
     const response = await fetch(
       "http://localhost:3001/api/user/update/password",
                {
         method: "POST",
         headers: { "Content-Type": "application/json",Authorization: "Bearer " + localStorage.getItem("token") },
         body: JSON.stringify({ username, newPassword, oldPassword }),
       }
     );
     const data = await response.json();
     if (!response.ok || !data.success) {
       // Handle error from API call
       setErrorMessage(data.message || "Invalid email or password");
       setSuccessMessage("");
       return;
     }

     // Password reset successful
     setSuccessMessage("Password reset successful!");
     setErrorMessage("");
   } catch (error) {
     // Handle errors from the API call or other errors
     console.error("Error during password reset:", error);
     setErrorMessage("An error occurred. Please try again.");
     setSuccessMessage("");
   }
 };


  return (
    <div className={`container ${styles.signupContainer}`}>
      <div className={`card ${styles.signupForm}`}>
        <h3 className="card-title text-center fw-bold">Reset Password</h3>

        <div className="row">
          <div className="col-md-12">
            <label>Username</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <label>Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </div>

        <button
          style={{ marginTop: "20px" }}
          className="btn btn-primary"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
        <div style={{margin:"auto",padding:"5px"}}>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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

export default Update;
