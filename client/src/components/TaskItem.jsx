import { format } from 'date-fns';
import { Pencil, Trash2, Calendar, CheckCircle2, Circle } from 'lucide-react';

export default function TaskItem({ task, onToggleStatus, onDelete, onEdit }) {
  const isCompleted = task.status === 'completed';

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    try {
      return format(new Date(dateStr + 'T00:00:00'), 'MMM d, yyyy');
    } catch {
      return null;
    }
  };

  const isOverdue = (dateStr) => {
    if (!dateStr || isCompleted) return false;
    try {
      const due = new Date(dateStr + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return due < today;
    } catch {
      return false;
    }
  };


 return (
    <div className={`bg-white/5 backdrop-blur-lg rounded-2xl border transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/20 hover:bg-white/10 ${isCompleted ? 'border-white/5 opacity-50 bg-black/20' : 'border-white/10 hover:border-white/20'}`}>
      <div className="flex items-start gap-4 p-5">
        
        <button
          onClick={() => onToggleStatus(task)}
          className={`mt-0.5 flex-shrink-0 transition-all duration-300 hover:scale-110 drop-shadow-md ${isCompleted ? 'text-emerald-400' : 'text-neutral-400 hover:text-amber-400'}`}
        >
          {isCompleted ? <CheckCircle2 size={22} /> : <Circle size={22} />}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-base tracking-tight transition-colors duration-300 ${isCompleted ? 'line-through text-neutral-500' : 'text-white'}`}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className={`text-sm mt-1.5 leading-relaxed ${isCompleted ? 'text-neutral-600' : 'text-neutral-300'}`}>
              {task.description}
            </p>
          )}
          
          {task.due_date && (
            <div className={`flex items-center gap-1.5 mt-3 text-xs font-bold tracking-wide ${isOverdue(task.due_date) ? 'text-red-300 bg-red-500/20 border border-red-500/30 px-2.5 py-1 rounded-md inline-flex' : 'text-neutral-400'}`}>
              <Calendar size={13} />
              {isOverdue(task.due_date) ? 'Overdue · ' : ''}
              {formatDate(task.due_date)}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:opacity-100">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-neutral-400 hover:text-red-400 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}