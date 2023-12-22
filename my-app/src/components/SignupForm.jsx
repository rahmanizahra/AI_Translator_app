import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./SignupForm.module.css";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showMessage, setShowMessage] = useState(false);
 const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    } else {
      try{
        const response = await fetch("http://localhost:3001/api/user/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        console.log(response);
        if(!response.ok){
          setPasswordError("Invalid username or password");
      }else{
setShowMessage("Account created successfully. Please log in.");
      }

    }catch(error){
      console.error("Fetch error:", error);
      setPasswordError("An error occurred. Please try again later.");
    }
  }
  };

  return (
    <>
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
                    style={{
                    backgroundColor: " #ffd68a",
                    width: "100%",
                    marginBottom: "5px",
                  }}
                >
                  Username
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
             
              <div className="mb-3">
                <label
                  htmlFor="password"
                  style={{
                    backgroundColor: " #ffd68a",
                    width: "100%",
                    marginBottom: "5px",
                  }}
                >
                  Password
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
                    setPasswordError(""); 
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
              <div style={{margin:"auto",color:"green",padding:"5px"}}>
                <p>{showMessage}</p>
              </div>
            </form>
            <div style={{margin:"auto"}}>
              <p style={{ margin: "auto", paddingTop: "10px" }}>
                <button className="btn btn-link" onClick={() => navigate("/")}>
                  Back to Login
                </button>
              </p>
            </div>
          </div>
        </div>
    </>
  );
}

export default SignupForm;
