import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export function SignupPage({ setIsLoggedIn, setCurrentUser }) {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();

  const checkPasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.role || !formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const signupRes = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      const token = signupRes.data.token;
      localStorage.setItem("token", token);

      const profileRes = await axios.get(
        "http://localhost:5000/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCurrentUser(profileRes.data);
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }

    setLoading(false);
  };

  const getStrengthColor = () => {
    return [
      "bg-gray-300",
      "bg-red-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-green-500",
    ][passwordStrength];
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* LEFT */}
        <div className="hidden md:block">
          <h1 className="text-6xl font-extrabold text-[var(--text)]">
            Join Us Today
          </h1>
          <p className="mt-6 text-lg text-[var(--gray-700)]">
            Create an account to access our service platform.
          </p>
        </div>

        {/* RIGHT */}
        <div className="bg-[var(--gray-100)] rounded-2xl shadow-xl p-10 max-w-md mx-auto w-full border border-[var(--border-light)]">
          <h2 className="text-3xl font-bold text-[var(--text)] mb-2">
            Create Account
          </h2>
          <p className="text-[var(--gray-700)] mb-8">
            Fill in your details to get started
          </p>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-[color:var(--danger)]/15 text-[var(--danger)]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* ROLE */}
            <div>
              <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-[var(--border-light)] bg-[var(--background)] text-[var(--text)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            {/* NAME */}
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full border border-[var(--border-light)] bg-[var(--background)] text-[var(--text)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />

            {/* EMAIL */}
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full border border-[var(--border-light)] bg-[var(--background)] text-[var(--text)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />

            {/* PASSWORD */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border border-[var(--border-light)] bg-[var(--background)] text-[var(--text)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />

            {/* STRENGTH BAR */}
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded ${i < passwordStrength ? getStrengthColor() : "bg-[var(--gray-200)]"}`}
                />
              ))}
            </div>

            {/* CONFIRM */}
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="w-full border border-[var(--border-light)] bg-[var(--background)] text-[var(--text)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />

            <button
              disabled={loading}
              className="w-full bg-[var(--primary)] hover:opacity-95 text-white font-semibold py-3 rounded-lg"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-[var(--gray-700)]">
              Already have an account?{" "}
              <Link to="/login" className="text-[var(--primary)] font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
