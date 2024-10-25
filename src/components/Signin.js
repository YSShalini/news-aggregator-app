import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Signin.css';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const response = await axios.post("http://localhost:5000/api/signin", { email, password });
        localStorage.setItem('user', JSON.stringify(response.data));
        setIsLoading(false);
        navigate("/homepage");
    } catch (error) {
        console.error("Sign in error:", error);
        setErrorMessage("Invalid credentials, please try again.");
        setIsLoading(false);
    }
};


  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default Signin;
