import { ClipboardList } from 'lucide-react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, loading, onToggleStatus, onDelete, onEdit }) {

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm animate-pulse"
          >
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <ClipboardList size={40} className="text-gray-300 mb-3" />
        <p className="text-gray-500 font-medium">No tasks found</p>
        <p className="text-gray-400 text-sm mt-1">
          Add a new task above to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}