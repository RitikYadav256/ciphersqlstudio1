import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    emailId: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", form.emailId);

      alert("Login Successful");
      navigate("/");
    } else {
      alert(data.message || "Invalid credentials");
    }
  } catch (error) {
    console.error("Login error", error);
    alert("Server error");
  }
};


  return (
    <div className={styles.container}>
      <h1 className={styles.heading}> Welcome to CipherSqlStudio</h1>
      
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          name="emailId"
          placeholder="Email"
          value={form.emailId}
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          required
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>

      <p className={styles.loginText}>
        Don’t have an account?
        <button onClick={() => navigate("/signup")}>Sign Up</button>
      </p>
    </div>
  );
};

export default Login;
