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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <p className="text-gray-500 mt-1">Manage your tasks efficiently</p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Task Form */}
        <TaskForm
          onTaskCreated={handleTaskCreated}
          onTaskUpdated={handleTaskUpdated}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        {/* Filter Bar */}
        <FilterBar filter={filter} onFilterChange={setFilter} />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          loading={loading}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
          onEdit={setEditingTask}
        />

      </div>
    </div>
  );
}