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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, shadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
      className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-md hover:border-purple-500/50 transition-all duration-300 group"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-white leading-tight flex-1 pr-4">{task.title}</h3>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-2 bg-slate-700 rounded-lg text-slate-300 hover:text-white hover:bg-purple-600 transition shadow-inner"
            title="Edit Task"
          >
            <HiPencil size={16} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 bg-slate-700 rounded-lg text-slate-300 hover:text-white hover:bg-red-500 transition shadow-inner"
            title="Delete Task"
          >
            <HiTrash size={16} />
          </button>
        </div>
      </div>

      <p className="text-slate-400 text-sm mb-6 line-clamp-3 min-h-[3rem]">
        {task.description || "No description provided"}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <span className={`text-xs px-3 py-1.5 rounded-full border font-medium uppercase tracking-wide ${statusColors[task.status]}`}>
          {task.status.replace('-', ' ')}
        </span>
        <span className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${priorityColors[task.priority]}`}>
          <span className={`w-2 h-2 rounded-full ${priorityColors[task.priority].replace('text-', 'bg-')}`}></span>
          {task.priority}
        </span>
      </div>
    </motion.div>
  );
};

export default TaskCard;
