import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { HiOutlineSparkles } from "react-icons/hi2";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 40px",
        background: "rgba(10, 10, 15, 0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <motion.div
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.4 }}
          style={{
            width: 32,
            height: 32,
            borderRadius: "var(--radius-sm)",
            background: "var(--gradient-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HiOutlineSparkles size={18} color="#fff" />
        </motion.div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 700,
            background: "var(--gradient-hero)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          TaskFlow
        </span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {user ? (
          <>
            <Link to="/dashboard">
              <motion.span
                whileHover={{ color: "#a29bfe" }}
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  transition: "color 0.2s",
                }}
              >
                Dashboard
              </motion.span>
            </Link>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "6px 14px",
                borderRadius: "var(--radius-xl)",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--gradient-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                }}
              >
                {user.name}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              style={{
                padding: "8px 20px",
                borderRadius: "var(--radius-xl)",
                background: "rgba(255, 107, 107, 0.1)",
                color: "var(--accent-danger)",
                border: "1px solid rgba(255, 107, 107, 0.2)",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              Logout
            </motion.button>
          </>
        ) : (
          <>
            <Link to="/login">
              <motion.span
                whileHover={{ color: "#a29bfe" }}
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                }}
              >
                Login
              </motion.span>
            </Link>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(108,92,231,0.4)" }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "8px 22px",
                  borderRadius: "var(--radius-xl)",
                  background: "var(--gradient-primary)",
                  color: "#fff",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  border: "none",
                }}
              >
                Sign Up
              </motion.button>
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
