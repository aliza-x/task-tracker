import React from 'react';

const FilterBar = ({ filters, onChange, taskCount }) => {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="filter-bar">
      <span className="task-count">{taskCount} task{taskCount !== 1 ? 's' : ''}</span>

      <div className="filter-controls">
        <select name="status" value={filters.status || 'all'} onChange={handleChange}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select name="priority" value={filters.priority || 'all'} onChange={handleChange}>
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select name="sort" value={filters.sort || 'createdAt'} onChange={handleChange}>
          <option value="createdAt">Newest First</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
