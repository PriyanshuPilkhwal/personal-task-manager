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
    <div className={`bg-white rounded-xl border p-4 shadow-sm transition-all
                     ${isCompleted
                       ? 'border-gray-100 opacity-75'
                       : 'border-gray-200 hover:border-blue-200 hover:shadow-md'
                     }`}>
      <div className="flex items-start gap-3">

        {/* Complete Toggle Button */}
        <button
          onClick={() => onToggleStatus(task)}
          className={`mt-0.5 flex-shrink-0 transition-colors
                      ${isCompleted
                        ? 'text-green-500 hover:text-gray-400'
                        : 'text-gray-300 hover:text-green-500'
                      }`}
        >
          {isCompleted
            ? <CheckCircle2 size={20} />
            : <Circle size={20} />
          }
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-sm leading-snug
                          ${isCompleted
                            ? 'line-through text-gray-400'
                            : 'text-gray-800'
                          }`}>
            {task.title}
          </h3>

          {task.description && (
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              {task.description}
            </p>
          )}

          {task.due_date && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium
                             ${isOverdue(task.due_date)
                               ? 'text-red-500'
                               : 'text-gray-400'
                             }`}>
              <Calendar size={12} />
              {isOverdue(task.due_date) ? 'Overdue · ' : ''}
              {formatDate(task.due_date)}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 hover:text-blue-500
                       hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit task"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-gray-400 hover:text-red-500
                       hover:bg-red-50 rounded-lg transition-colors"
            title="Delete task"
          >
            <Trash2 size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}