import { useState, useEffect } from 'react';
import { fetchTasks, deleteTask, updateTask } from './api';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';

export default function App() {
  const [tasks, setTasks]       = useState([]);
  const [filter, setFilter]     = useState('all');
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  // ─── Fetch tasks whenever filter changes 
  useEffect(() => {
    loadTasks();
  }, [filter]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const status = filter === 'all' ? '' : filter;
      const res = await fetchTasks(status);
      setTasks(res.data);
    } catch (err) {
      setError('Failed to load tasks. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  // ─── Add a new task to the top of the list 
  const handleTaskCreated = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
  };

  // ─── Update a task in the list after editing 
  const handleTaskUpdated = (updatedTask) => {
    setTasks(prev =>
      prev.map(t => t.id === updatedTask.id ? updatedTask : t)
    );
    setEditingTask(null);
  };

  // ─── Toggle task status between active and completed 
  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'active' ? 'completed' : 'active';
      const res = await updateTask(task.id, { status: newStatus });
      setTasks(prev =>
        prev.map(t => t.id === task.id ? res.data : t)
      );
    } catch (err) {
      setError('Failed to update task status.');
    }
  };

  // ─── Delete a task from the list 
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden selection:bg-amber-500/30">
      {/* Sunlight Background Glow */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-600/15 blur-[120px] rounded-[100%] pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight bg-[linear-gradient(to_right,#fbad61,#f6776b,#b484ce,#7fa0dd,#69c9a6)] bg-clip-text text-transparent pb-1">
  Task Manager
</h1>
          <p className="text-neutral-400 mt-2 font-medium tracking-wide">
            Beautifully manage your daily workflow.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-900/30 backdrop-blur-sm border border-red-800 text-red-400 rounded-2xl text-sm shadow-sm">
            {error}
          </div>
        )}

        <TaskForm
          onTaskCreated={handleTaskCreated}
          onTaskUpdated={handleTaskUpdated}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        <div className="flex justify-center mb-8">
          <FilterBar filter={filter} onFilterChange={setFilter} />
        </div>

        <div className="max-h-[55vh] overflow-y-auto pr-2 pb-4 scroll-smooth">
          <TaskList
            tasks={tasks}
            loading={loading}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
            onEdit={setEditingTask}
          />
        </div>
      </div>
    </div>
  );
  
}