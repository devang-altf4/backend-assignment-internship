import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineArrowRight,
  HiOutlineSparkles,
} from "react-icons/hi2";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const features = [
  {
    icon: <HiOutlineClipboardDocumentCheck size={28} />,
    title: "Task Management",
    desc: "Create, update, and track your tasks with an intuitive interface",
    color: "#6c5ce7",
  },
  {
    icon: <HiOutlineShieldCheck size={28} />,
    title: "Secure Auth",
    desc: "JWT-based authentication with role-based access control",
    color: "#00cec9",
  },
  {
    icon: <HiOutlineBolt size={28} />,
    title: "Fast & Scalable",
    desc: "Built with modern tech stack for blazing performance",
    color: "#fdcb6e",
  },
];

const Landing = () => {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 65px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow effects */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(108,92,231,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(0,206,201,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Badge */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 18px",
          borderRadius: "var(--radius-xl)",
          background: "rgba(108, 92, 231, 0.1)",
          border: "1px solid rgba(108, 92, 231, 0.2)",
          marginBottom: "28px",
          fontSize: "0.85rem",
          fontWeight: 500,
          color: "var(--accent-primary-light)",
        }}
      >
        <HiOutlineSparkles size={16} />
        Simple. Powerful. Beautiful.
      </motion.div>

      {/* Hero heading */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.1,
          marginBottom: "20px",
          maxWidth: "700px",
        }}
      >
        Manage Tasks{" "}
        <span
          style={{
            background: "var(--gradient-hero)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Effortlessly
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={2}
        style={{
          fontSize: "1.1rem",
          color: "var(--text-secondary)",
          textAlign: "center",
          maxWidth: "520px",
          lineHeight: 1.7,
          marginBottom: "40px",
        }}
      >
        A simple and powerful task management app with secure authentication
        and role-based access control. Built for teams and individuals.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={3}
        style={{ display: "flex", gap: "16px", marginBottom: "80px" }}
      >
        <Link to="/register">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(108,92,231,0.4)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 32px",
              borderRadius: "var(--radius-xl)",
              background: "var(--gradient-primary)",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 600,
              border: "none",
            }}
          >
            Get Started
            <HiOutlineArrowRight size={18} />
          </motion.button>
        </Link>
        <Link to="/login">
          <motion.button
            whileHover={{ scale: 1.05, background: "rgba(108,92,231,0.15)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "14px 32px",
              borderRadius: "var(--radius-xl)",
              background: "rgba(108,92,231,0.08)",
              color: "var(--text-primary)",
              fontSize: "1rem",
              fontWeight: 600,
              border: "1px solid var(--border-color)",
            }}
          >
            Login
          </motion.button>
        </Link>
      </motion.div>

      {/* Feature Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4 + i}
            whileHover={{ y: -6, boxShadow: `0 12px 40px ${f.color}15` }}
            style={{
              padding: "32px 28px",
              borderRadius: "var(--radius-lg)",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              textAlign: "center",
              transition: "border-color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = f.color + "40")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "var(--radius-md)",
                background: f.color + "15",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                color: f.color,
              }}
            >
              {f.icon}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              {f.title}
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={7}
        style={{
          marginTop: "60px",
          fontSize: "0.8rem",
          color: "var(--text-muted)",
        }}
      >
        DevangTaskManager © 2026 — Built with React & Express
      </motion.p>
    </div>
  );
};

export default Landing;
