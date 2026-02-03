import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import "../SignupPage/SignupPage.jsx";

export function LoginPage({ setIsLoggedIn, setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ REAL LOGIN (backend connected)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ LOGIN
      const loginRes = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const token = loginRes.data.token;

      // 2️⃣ SAVE TOKEN
      localStorage.setItem("token", token);

      // 3️⃣ FETCH PROFILE
      const profileRes = await axios.get(
        "http://localhost:5000/api/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = profileRes.data;

      // 4️⃣ STORE USER
      setCurrentUser(user);
      setIsLoggedIn(true);

      // ✅ ROLE BASED REDIRECT
      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/staff-dashboard");
      }

    } catch (err) {
      console.log(err.response);
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">
            Sign in to your account to continue
          </p>
        </div>

        <div className="login-right">
          <div className="login-form-wrapper">

            <div className="login-header">
              <h2>Sign In</h2>
              <p>Access your account</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  placeholder="your@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-6">
                don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 font-semibold transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
