import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { HiOutlineLockClosed, HiOutlineEnvelope, HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px 14px 44px",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border-color)",
    background: "rgba(10, 10, 15, 0.6)",
    color: "var(--text-primary)",
    fontSize: "0.95rem",
    transition: "border-color 0.3s, box-shadow 0.3s",
  };

  const labelStyle = {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "8px",
    display: "block",
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 65px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        position: "relative",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(108,92,231,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "40px 36px",
          borderRadius: "var(--radius-xl)",
          background: "var(--bg-glass)",
          backdropFilter: "blur(20px)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-lg), var(--shadow-glow)",
          position: "relative",
        }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          style={{
            width: 56,
            height: 56,
            borderRadius: "var(--radius-md)",
            background: "var(--gradient-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            boxShadow: "0 8px 24px rgba(108,92,231,0.3)",
          }}
        >
          <HiOutlineLockClosed size={26} color="#fff" />
        </motion.div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.6rem",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "6px",
          }}
        >
          Welcome Back
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            fontSize: "0.9rem",
            marginBottom: "32px",
          }}
        >
          Sign in to continue to DevangTaskManager
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Email</label>
            <div style={{ position: "relative" }}>
              <HiOutlineEnvelope
                size={18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--accent-primary)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(108,92,231,0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border-color)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: "relative" }}>
              <HiOutlineLockClosed
                size={18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ ...inputStyle, paddingRight: "44px" }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--accent-primary)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(108,92,231,0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border-color)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                {showPassword ? <HiOutlineEyeSlash size={18} /> : <HiOutlineEye size={18} />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(108,92,231,0.4)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "var(--radius-md)",
              background: loading ? "var(--text-muted)" : "var(--gradient-primary)",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 600,
              border: "none",
              letterSpacing: "0.02em",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "24px",
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ color: "var(--accent-primary-light)", fontWeight: 600 }}
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
