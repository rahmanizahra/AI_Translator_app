import { BeatLoader } from "react-spinners";
import React, { useState} from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [formData, setFormData] = useState({
    language: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [translation, setTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate();

  const API_URL = "http://localhost:3001/api";
  const translate = async () => {
    const { language, message } = formData;
    try {
      const response = await fetch(`${API_URL}/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token") },
        body: JSON.stringify({ language, message }),
      });

      if (response.ok) {
        const result = await response.json();
        setIsLoading(false);
        setTranslation(result.translatedText);
      } else {
        console.error("Translation error:", response.status);
      }
    } catch (error) {
      console.error("Translation error:", error);
      setIsLoading(false);
    }
  };

  const rewrite = async () => {
    const { message, language } = formData;
    try {
      const response = await fetch(`${API_URL}/rewrite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token") },
          body: JSON.stringify({ message: message, language: language })
        });
      if (response.ok) {
        const result = await response.json();
        setIsLoading(false);
        setTranslation(result.rewrittenText);
      } else {
        console.error("Rewriting error:", response.status);
      }
    } catch (error) {
      console.error("Rewriting error:", error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!formData.message) {
      setError("Please enter the message.");
      return;
    }
    setIsLoading(true);
    translate();
  };

  const handleRewrite = (e) => {
    e.preventDefault();
    if (!formData.message) {
      setError("Please enter the message.");
      return;
    }
    setIsLoading(true);
    rewrite();
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(translation)
      .then(() => displayNotification())
      .catch((err) => console.error("failed to copy: ", err));
  };

  const displayNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }
const handleUpdatePassword = () => {
    // Handle password update logic (replace with your password update logic)
    navigate("/update/password");
  };

  const handleDelete = () => {
    // Handle account deletion logic (replace with your actual account deletion logic)
    navigate("/delete");
  };
  return (
    <>
      <div
        className="container"
        style={{ backgroundColor: "rgb(59, 158, 167)" }}
      >
        <header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Profile
        </button>
        <ul className="dropdown-menu">
          <li>
            <button className="dropdown-item" onClick={handleUpdatePassword}>
              Update Password
            </button>
          </li>
           <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button className="dropdown-item " onClick={handleDelete}>
              Delete Account
            </button>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
        <form
          onSubmit={handleOnSubmit}
          style={{ backgroundColor: "rgb(59, 158, 167)" }}
        >
          <div
            className="choices"
            style={{ backgroundColor: "rgb(59, 158, 167)" }}
          >
            <label htmlFor="language">Select a language:</label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="backgroundWhite"
            >
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
              <option value="Japanese">Japanese</option>
              <option value="Persian">Persian</option>
              <option value="Arabic">Arabic</option>
            </select>
          </div>
          <textarea
            style={{ marginTop: "20px", width: "100%", height: "200px" }}
            name="message"
            placeholder="Type your message here.."
            onChange={handleInputChange}
            spellCheck="true"
          ></textarea>

          {error && <div className="error">{error}</div>}
          <div>
            <button
              style={{ width: "100%", marginBottom: "10px" }}
              type="submit"
              className="backgroundWhite"
            >
              Translate
            </button>
          </div>
          <div>
            <button
              className="backgroundWhite"
              style={{ width: "100%" }}
              onClick={handleRewrite}
            >
              Rewrite
            </button>
          </div>
        </form>

        <div className="translation">
          <div className="copy-btn" onClick={handleCopy}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
              />
            </svg>
          </div>

          {isLoading ? <BeatLoader size={12} color={"red"} /> : translation}
        </div>

        <div className={`notification ${showNotification ? "active" : ""}`}>
          Copied to clipboard!
        </div>
      </div>
    </>
  );
}

export default App;
