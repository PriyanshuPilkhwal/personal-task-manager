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
    <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 p-7 mb-8 shadow-2xl shadow-black/50">
      <h2 className="text-lg font-bold text-white mb-4">
        {editingTask ? 'Edit Task' : 'Add New Task'}
      </h2>
      
      {error && (
        <div className="mb-3 p-2 bg-red-500/20 border border-red-500/50 text-red-200 rounded text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Task title *"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 placeholder-neutral-400 transition-all"
          />
        </div>
        
        <div>
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={2}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 placeholder-neutral-400 resize-none transition-all"
          />
        </div>
        
       <div>
          <input
            type={dueDate ? "date" : "text"}
            placeholder="Due date *"
            required
            onFocus={(e) => e.target.type = "date"}
            onBlur={(e) => {
              if (!dueDate) e.target.type = "text";
            }}
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-neutral-300 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all [color-scheme:dark]"
          />
        </div>
        
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-xl text-sm font-bold shadow-lg hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {editingTask
              ? <><Save size={16} /> {submitting ? 'Saving...' : 'Save Changes'}</>
              : <><PlusCircle size={16} /> {submitting ? 'Adding...' : 'Add Task'}</>
            }
          </button>
          
          {editingTask && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="flex items-center gap-2 px-6 py-2.5 bg-white/10 text-white border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/20 transition-colors"
            >
              <X size={16} /> Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}