import React from 'react';

const STATUS_LABELS = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  completed: 'Completed'
};

const PRIORITY_COLORS = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444'
};

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const isOverdue =
    task.dueDate &&
    task.status !== 'completed' &&
    new Date(task.dueDate) < new Date();

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const cycleStatus = () => {
    const cycle = { pending: 'in-progress', 'in-progress': 'completed', completed: 'pending' };
    onStatusChange(task._id, cycle[task.status]);
  };

  return (
    <div className={`task-card ${task.status} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-card-header">
        <div className="task-title-row">
          <span
            className="priority-dot"
            style={{ background: PRIORITY_COLORS[task.priority] }}
            title={`Priority: ${task.priority}`}
          />
          <h3 className="task-title">{task.title}</h3>
        </div>
        <div className="task-actions">
          <button className="btn-icon" onClick={onEdit} title="Edit">✏️</button>
          <button className="btn-icon btn-delete" onClick={() => onDelete(task._id)} title="Delete">🗑️</button>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <button className={`status-badge status-${task.status}`} onClick={cycleStatus} title="Click to change status">
          {STATUS_LABELS[task.status]}
        </button>

        {task.dueDate && (
          <span className={`due-date ${isOverdue ? 'overdue-text' : ''}`}>
            📅 {isOverdue ? '⚠️ ' : ''}{formatDate(task.dueDate)}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
