import { useState, useEffect } from 'react';
import { createTask, updateTask } from '../api';
import { PlusCircle, Save, X } from 'lucide-react';

export default function TaskForm({ onTaskCreated, onTaskUpdated, editingTask, onCancelEdit }) {
  const [title, setTitle]             = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate]         = useState('');
  const [submitting, setSubmitting]   = useState(false);
  const [error, setError]             = useState(null);

  // ─── Populate form when editing a task ──────────────────────────────────
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setDueDate(editingTask.due_date || '');
    } else {
      resetForm();
    }
  }, [editingTask]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const payload = {
        title:       title.trim(),
        description: description.trim() || null,
        due_date:    dueDate || null,
      };

      if (editingTask) {
        const res = await updateTask(editingTask.id, payload);
        onTaskUpdated(res.data);
      } else {
        const res = await createTask(payload);
        onTaskCreated(res.data);
        resetForm();
      }
    } catch (err) {
      setError('Failed to save task. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {editingTask ? 'Edit Task' : 'Add New Task'}
      </h2>

      {error && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 text-red-600 rounded text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">

        {/* Title */}
        <div>
          <input
            type="text"
            placeholder="Task title *"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       placeholder-gray-400"
          />
        </div>

        {/* Description */}
        <div>
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       placeholder-gray-400 resize-none"
          />
        </div>

        {/* Due Date */}
        <div>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       text-gray-600"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white
                       rounded-lg text-sm font-medium hover:bg-blue-700
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {editingTask
              ? <><Save size={15} /> {submitting ? 'Saving...' : 'Save Changes'}</>
              : <><PlusCircle size={15} /> {submitting ? 'Adding...' : 'Add Task'}</>
            }
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600
                         rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <X size={15} /> Cancel
            </button>
          )}
        </div>

      </form>
    </div>
  );
}