import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { HiTrash, HiShieldCheck, HiUser } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('users');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [usersRes, tasksRes] = await Promise.all([
        API.get('/users'),
        API.get('/tasks/all')
      ]);
      setUsers(usersRes.data.data);
      setAllTasks(tasksRes.data.data);
    } catch (err) {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await API.delete(`/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      setAllTasks(allTasks.filter((t) => t.user?._id !== id));
      toast.success('User deleted');
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await API.delete(`/tasks/${id}`);
      setAllTasks(allTasks.filter((task) => task._id !== id));
      toast.success('Task deleted');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: 'calc(100vh - 65px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '3px solid rgba(108,92,231,0.2)',
            borderTopColor: '#6c5ce7',
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 28 }}
      >
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, marginBottom: 6 }}>
          Admin Panel
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Manage users, delete any record, and view every user's tasks.
        </p>
      </motion.div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        <div style={{ padding: '18px 16px', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.65rem', fontWeight: 700 }}>{users.length}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Total Users</p>
        </div>
        <div style={{ padding: '18px 16px', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.65rem', fontWeight: 700 }}>{allTasks.length}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Total Tasks</p>
        </div>
        <div style={{ padding: '18px 16px', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.65rem', fontWeight: 700 }}>{users.filter(u => u.role === 'admin').length}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Admins</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 18, borderBottom: '1px solid var(--border-color)', paddingBottom: 10 }}>
        <button
          onClick={() => setTab('users')}
          style={{
            padding: '9px 16px',
            borderRadius: 'var(--radius-md)',
            border: tab === 'users' ? '1px solid rgba(108,92,231,0.35)' : '1px solid var(--border-color)',
            background: tab === 'users' ? 'rgba(108,92,231,0.16)' : 'var(--bg-card)',
            color: tab === 'users' ? '#a29bfe' : 'var(--text-secondary)',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          Users
        </button>
        <button
          onClick={() => setTab('tasks')}
          style={{
            padding: '9px 16px',
            borderRadius: 'var(--radius-md)',
            border: tab === 'tasks' ? '1px solid rgba(108,92,231,0.35)' : '1px solid var(--border-color)',
            background: tab === 'tasks' ? 'rgba(108,92,231,0.16)' : 'var(--bg-card)',
            color: tab === 'tasks' ? '#a29bfe' : 'var(--text-secondary)',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          All Tasks
        </button>
      </div>

      {/* Users Tab */}
      {tab === 'users' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <AnimatePresence>
            {users.map((u) => (
              <motion.div
                key={u._id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: u.role === 'admin' ? 'rgba(108,92,231,0.18)' : 'rgba(148,163,184,0.12)',
                    color: u.role === 'admin' ? '#a29bfe' : 'var(--text-muted)'
                  }}>
                    {u.role === 'admin' ? <HiShieldCheck size={18} /> : <HiUser size={18} />}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{u.name}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{u.email}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    background: u.role === 'admin' ? 'rgba(108,92,231,0.2)' : 'rgba(148,163,184,0.14)',
                    color: u.role === 'admin' ? '#a29bfe' : 'var(--text-secondary)',
                    border: '1px solid var(--border-color)',
                    textTransform: 'capitalize',
                    fontWeight: 600
                  }}>
                    {u.role}
                  </span>
                  <button
                    onClick={() => handleDeleteUser(u._id)}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(255,107,107,0.24)',
                      background: 'rgba(255,107,107,0.1)',
                      color: '#ff6b6b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    title="Delete user"
                  >
                    <HiTrash size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Tasks Tab */}
      {tab === 'tasks' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {allTasks.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '22px 0' }}>No tasks found</p>
          ) : (
            allTasks.map((task) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '14px 16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 4 }}>{task.title}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{task.description || 'No description'}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', marginTop: 8 }}>
                      by {task.user?.name || 'Unknown'} ({task.user?.email || 'N/A'})
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      padding: '5px 10px',
                      borderRadius: '999px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      border: '1px solid var(--border-color)',
                      background: task.status === 'done'
                        ? 'rgba(0,184,148,0.15)'
                        : task.status === 'in-progress'
                        ? 'rgba(9,132,227,0.15)'
                        : 'rgba(253,203,110,0.16)',
                      color: task.status === 'done'
                        ? '#55efc4'
                        : task.status === 'in-progress'
                        ? '#74b9ff'
                        : '#fdcb6e',
                      textTransform: 'capitalize'
                    }}>
                      {task.status}
                    </span>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(255,107,107,0.24)',
                        background: 'rgba(255,107,107,0.1)',
                        color: '#ff6b6b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      title="Delete task"
                    >
                      <HiTrash size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
