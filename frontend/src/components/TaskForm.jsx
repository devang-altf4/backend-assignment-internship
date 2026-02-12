import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TaskForm = ({ onSubmit, editingTask, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium'
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        status: editingTask.status || 'todo',
        priority: editingTask.priority || 'medium'
      });
    } else {
      setFormData({ title: '', description: '', status: 'todo', priority: 'medium' });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!editingTask) {
      setFormData({ title: '', description: '', status: 'todo', priority: 'medium' });
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      onSubmit={handleSubmit}
      className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-8 shadow-xl overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {editingTask ? 'Edit Task' : 'Create New Task'}
        </h3>
        {onCancel && (
            <button type="button" onClick={onCancel} className="text-slate-400 hover:text-white">
                ✕
            </button>
        )}
      </div>

      <div className="grid md:grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Task Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition placeholder-slate-500"
            placeholder="What needs to be done?"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition cursor-pointer appearance-none"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition cursor-pointer appearance-none"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition h-32 resize-none placeholder-slate-500"
          placeholder="Add details about your task..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-xl text-slate-300 hover:bg-slate-700 transition font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-600/20 transition cursor-pointer"
        >
          {editingTask ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </motion.form>
  );
};

export default TaskForm;
