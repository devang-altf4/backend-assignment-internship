import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineClock,
  HiOutlineBolt,
  HiOutlineCheckCircle,
  HiOutlinePlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineFunnel,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import toast from "react-hot-toast";
import API from "../services/api";

const statCards = [
  { key: "total", label: "Total Tasks", icon: <HiOutlineClipboardDocumentList size={22} />, color: "#6c5ce7", bg: "rgba(108,92,231,0.1)" },
  { key: "todo", label: "To Do", icon: <HiOutlineClock size={22} />, color: "#fdcb6e", bg: "rgba(253,203,110,0.1)" },
  { key: "inprogress", label: "In Progress", icon: <HiOutlineBolt size={22} />, color: "#0984e3", bg: "rgba(9,132,227,0.1)" },
  { key: "completed", label: "Completed", icon: <HiOutlineCheckCircle size={22} />, color: "#00b894", bg: "rgba(0,184,148,0.1)" },
];

const statusColors = {
  todo: { bg: "rgba(253,203,110,0.12)", text: "#fdcb6e", border: "rgba(253,203,110,0.3)" },
  "in-progress": { bg: "rgba(9,132,227,0.12)", text: "#74b9ff", border: "rgba(9,132,227,0.3)" },
  done: { bg: "rgba(0,184,148,0.12)", text: "#55efc4", border: "rgba(0,184,148,0.3)" },
};

const statusLabel = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

const normalizeStatus = (status) => {
  if (status === "To Do") return "todo";
  if (status === "In Progress") return "in-progress";
  if (status === "Completed") return "done";
  return status || "todo";
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", status: "todo" });

  const fetchTasks = async () => {
    if (!user) {
      setTasks([]);
      return;
    }
    try {
      const res = await API.get("/tasks");
      const fetchedTasks = (res?.data?.data || []).map((task) => ({
        ...task,
        status: normalizeStatus(task.status),
      }));
      setTasks(fetchedTasks);
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.response?.data?.message || "Failed to fetch tasks");
    }
  };
  useEffect(() => { fetchTasks(); }, [user]);

  const filtered = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);
  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    inprogress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "done").length,
  };

  const openCreate = () => {
    if (!user) {
      toast.error("Please login to create tasks");
      return;
    }
    setEditTask(null);
    setForm({ title: "", description: "", status: "todo" });
    setShowModal(true);
  };
  const openEdit = (t) => {
    if (!user) {
      toast.error("Please login to edit tasks");
      return;
    }
    setEditTask(t);
    setForm({ title: t.title, description: t.description || "", status: normalizeStatus(t.status) });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to manage tasks");
      return;
    }
    try {
      if (editTask) {
        await API.put(`/tasks/${editTask._id}`, form);
        toast.success("Task updated!");
      } else {
        await API.post("/tasks", form);
        toast.success("Task created!");
      }
      setShowModal(false);
      fetchTasks();
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.response?.data?.message || "Failed to save task");
    }
  };

  const handleDelete = async (id) => {
    if (!user) {
      toast.error("Please login to delete tasks");
      return;
    }
    if (!confirm("Delete this task?")) return;
    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Task deleted!");
      fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}
      >
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, marginBottom: 4 }}>
            Dashboard
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            {user ? (
              <>
                Welcome back, <span style={{ color: "var(--accent-primary-light)", fontWeight: 600 }}>{user.name}</span>. Here's what's happening today.
              </>
            ) : (
              <>Welcome to DevangTaskManager. Manage your tasks efficiently.</>
            )}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-muted)", fontSize: "0.85rem" }}>
          <HiOutlineCalendarDays size={16} />
          {today}
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {statCards.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            whileHover={{ y: -4, boxShadow: `0 8px 30px ${s.color}15` }}
            style={{
              padding: "24px 20px",
              borderRadius: "var(--radius-lg)",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "var(--radius-md)",
                background: s.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: s.color,
                flexShrink: 0,
              }}
            >
              {s.icon}
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                {s.label}
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: s.color }}>
                {stats[s.key]}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <HiOutlineFunnel size={16} color="var(--text-muted)" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: "8px 14px",
              borderRadius: "var(--radius-sm)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)",
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(108,92,231,0.3)" }}
          whileTap={{ scale: 0.95 }}
          onClick={openCreate}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 22px",
            borderRadius: "var(--radius-md)",
            background: "var(--gradient-primary)",
            color: "#fff",
            fontSize: "0.9rem",
            fontWeight: 600,
            border: "none",
          }}
        >
          <HiOutlinePlus size={18} />
          New Task
        </motion.button>
      </motion.div>

      {/* Task List */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: "center",
            padding: "80px 20px",
            color: "var(--text-muted)",
            borderRadius: "var(--radius-lg)",
            border: "1px dashed var(--border-color)",
          }}
        >
          <HiOutlineClipboardDocumentList size={48} style={{ marginBottom: 16, opacity: 0.4 }} />
          <p style={{ fontSize: "1rem" }}>No tasks yet. Create one to get started!</p>
        </motion.div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <AnimatePresence>
            {filtered.map((task, i) => {
              const sc = statusColors[task.status] || statusColors.todo;
              return (
                <motion.div
                  key={task._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  whileHover={{ y: -2, boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
                  style={{
                    padding: "20px 24px",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1rem",
                        fontWeight: 600,
                        marginBottom: 4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {task.title}
                    </h4>
                    {task.description && (
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {task.description}
                      </p>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                    <span
                      style={{
                        padding: "5px 14px",
                        borderRadius: "var(--radius-xl)",
                        background: sc.bg,
                        color: sc.text,
                        border: `1px solid ${sc.border}`,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {statusLabel[task.status] || task.status}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openEdit(task)}
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(108,92,231,0.1)",
                        color: "var(--accent-primary-light)",
                        border: "1px solid rgba(108,92,231,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <HiOutlinePencilSquare size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(task._id)}
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(255,107,107,0.1)",
                        color: "var(--accent-danger)",
                        border: "1px solid rgba(255,107,107,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <HiOutlineTrash size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: 24,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 460,
                padding: "36px 32px",
                borderRadius: "var(--radius-xl)",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  marginBottom: 24,
                }}
              >
                {editTask ? "Edit Task" : "Create New Task"}
              </h3>
              <form onSubmit={handleSave}>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8, display: "block" }}>
                    Title
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    placeholder="Enter task title"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-color)",
                      background: "var(--bg-primary)",
                      color: "var(--text-primary)",
                      fontSize: "0.95rem",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--accent-primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(108,92,231,0.15)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border-color)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8, display: "block" }}>
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Optional description"
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-color)",
                      background: "var(--bg-primary)",
                      color: "var(--text-primary)",
                      fontSize: "0.95rem",
                      resize: "vertical",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--accent-primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(108,92,231,0.15)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border-color)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8, display: "block" }}>
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-color)",
                      background: "var(--bg-primary)",
                      color: "var(--text-primary)",
                      fontSize: "0.95rem",
                      cursor: "pointer",
                    }}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{
                      flex: 1,
                      padding: "12px",
                      borderRadius: "var(--radius-md)",
                      background: "rgba(108,92,231,0.08)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-color)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                    }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(108,92,231,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    style={{
                      flex: 1,
                      padding: "12px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--gradient-primary)",
                      color: "#fff",
                      border: "none",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                    }}
                  >
                    {editTask ? "Update Task" : "Create Task"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
