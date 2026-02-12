import { motion } from 'framer-motion';
import { HiTrash, HiPencil } from 'react-icons/hi';

const statusColors = {
  'todo': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'done': 'bg-green-500/20 text-green-400 border-green-500/30'
};

const priorityColors = {
  'low': 'text-slate-400',
  'medium': 'text-orange-400',
  'high': 'text-red-400'
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -3 }}
      className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 hover:border-purple-500/40 transition"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-white truncate pr-2">{task.title}</h3>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="text-slate-400 hover:text-purple-400 transition cursor-pointer"
          >
            <HiPencil size={18} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-slate-400 hover:text-red-400 transition cursor-pointer"
          >
            <HiTrash size={18} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-slate-400 text-sm mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center gap-3">
        <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[task.status]}`}>
          {task.status}
        </span>
        <span className={`text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority} priority
        </span>
      </div>
    </motion.div>
  );
};

export default TaskCard;
