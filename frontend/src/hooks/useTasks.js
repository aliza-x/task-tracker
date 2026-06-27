import { useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';

export const useTasks = (filters) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getTasks(filters);
      setTasks(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (data) => {
    const res = await api.createTask(data);
    setTasks((prev) => [res.data.data, ...prev]);
    return res.data.data;
  };

  const editTask = async (id, data) => {
    const res = await api.updateTask(id, data);
    setTasks((prev) => prev.map((t) => (t._id === id ? res.data.data : t)));
    return res.data.data;
  };

  const removeTask = async (id) => {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return { tasks, loading, error, addTask, editTask, removeTask, refetch: fetchTasks };
};
