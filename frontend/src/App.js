import React, { useState, useMemo } from 'react';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';
import FilterBar from './components/FilterBar';
import { useTasks } from './hooks/useTasks';
import './App.css';

function App() {
  const [filters, setFilters] = useState({ status: 'all', priority: 'all', sort: 'createdAt' });
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);

  // Build query params (exclude 'all' values)
  const queryParams = useMemo(() => {
    const p = {};
    if (filters.status !== 'all') p.status = filters.status;
    if (filters.priority !== 'all') p.priority = filters.priority;
    if (filters.sort) p.sort = filters.sort;
    return p;
  }, [filters]);

  const { tasks, loading, error, addTask, editTask, removeTask } = useTasks(queryParams);

  const notify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAdd = async (data) => {
    await addTask(data);
    setShowForm(false);
    notify('Task created!');
  };

  const handleEdit = async (data) => {
    await editTask(editingTask._id, data);
    setEditingTask(null);
    notify('Task updated!');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await removeTask(id);
    notify('Task deleted', 'info');
  };

  const handleStatusChange = async (id, newStatus) => {
    await editTask(id, { status: newStatus });
    notify(`Status updated to ${newStatus}`);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>📋 Task Tracker</h1>
            <p className="subtitle">Manage your tasks efficiently</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => { setShowForm(true); setEditingTask(null); }}
          >
            + New Task
          </button>
        </div>
      </header>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.msg}
        </div>
      )}

      <main className="app-main">
        {(showForm && !editingTask) && (
          <div className="form-container">
            <TaskForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
          </div>
        )}

        {editingTask && (
          <div className="form-container">
            <TaskForm
              initialData={editingTask}
              onSubmit={handleEdit}
              onCancel={() => setEditingTask(null)}
            />
          </div>
        )}

        <FilterBar filters={filters} onChange={setFilters} taskCount={tasks.length} />

        {loading && (
          <div className="state-message">
            <div className="spinner" />
            <p>Loading tasks...</p>
          </div>
        )}

        {error && (
          <div className="state-message error">
            <p>⚠️ {error}</p>
          </div>
        )}

        {!loading && !error && tasks.length === 0 && (
          <div className="state-message empty">
            <p>No tasks found. Add one above!</p>
          </div>
        )}

        <div className="task-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={() => { setEditingTask(task); setShowForm(false); }}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
