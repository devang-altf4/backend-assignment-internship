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
      toast.success('User deleted');
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
        <p className="text-slate-400">Manage users and view all tasks</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{users.length}</p>
          <p className="text-slate-400 text-sm">Total Users</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{allTasks.length}</p>
          <p className="text-slate-400 text-sm">Total Tasks</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</p>
          <p className="text-slate-400 text-sm">Admins</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-700 pb-2">
        <button
          onClick={() => setTab('users')}
          className={`px-4 py-2 rounded-t-lg transition cursor-pointer ${tab === 'users' ? 'bg-purple-600/20 text-purple-400 border-b-2 border-purple-400' : 'text-slate-400 hover:text-white'}`}
        >
          Users
        </button>
        <button
          onClick={() => setTab('tasks')}
          className={`px-4 py-2 rounded-t-lg transition cursor-pointer ${tab === 'tasks' ? 'bg-purple-600/20 text-purple-400 border-b-2 border-purple-400' : 'text-slate-400 hover:text-white'}`}
        >
          All Tasks
        </button>
      </div>

      {/* Users Tab */}
      {tab === 'users' && (
        <div className="space-y-3">
          <AnimatePresence>
            {users.map((u) => (
              <motion.div
                key={u._id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${u.role === 'admin' ? 'bg-purple-500/20' : 'bg-slate-700'}`}>
                    {u.role === 'admin' ? <HiShieldCheck className="text-purple-400" /> : <HiUser className="text-slate-400" />}
                  </div>
                  <div>
                    <p className="font-medium">{u.name}</p>
                    <p className="text-slate-400 text-sm">{u.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-700 text-slate-400'}`}>
                    {u.role}
                  </span>
                  {u._id !== user._id && (
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="text-slate-400 hover:text-red-400 transition cursor-pointer"
                    >
                      <HiTrash size={18} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Tasks Tab */}
      {tab === 'tasks' && (
        <div className="space-y-3">
          {allTasks.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No tasks found</p>
          ) : (
            allTasks.map((task) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-slate-400 text-sm">{task.description}</p>
                  </div>
                  <div className="text-right text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      task.status === 'done' ? 'bg-green-500/20 text-green-400' :
                      task.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
                <p className="text-slate-500 text-xs mt-2">
                  by {task.user?.name || 'Unknown'} ({task.user?.email || ''})
                </p>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
