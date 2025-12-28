import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/SignUp.module.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    password: "",
    confirmPassword: "",
    github: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          emailId: formData.emailId,
          password: formData.password,
          github: formData.github,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed!");
      }
    } catch (error) {
      console.log("Error signing up:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to CipherSqlStudio</h1>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Create Account</h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="emailId"
          placeholder="Email Address"
          value={formData.emailId}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="github"
          placeholder="GitHub Username"
          value={formData.github}
          onChange={handleChange}
        />

        <button type="submit">Sign Up</button>
      </form>

      <p className={styles.loginText}>
        Already have an account?{" "}
        <button onClick={() => navigate("/login")}>Log In</button>
      </p>
    </div>
  );
};

export default Signup;
