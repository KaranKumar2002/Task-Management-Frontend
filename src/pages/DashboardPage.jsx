import React, { useState, useEffect, useContext } from 'react';
import CreateTask from '../components/CreateTask';
import TaskList from '../components/TaskList';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { logout, user } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null); // 🆕 track task to edit

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
     const url = import.meta.env.VITE_API_URL || 'http://localhost:5000'

    try {
      const res = await fetch(`${url}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch tasks');
      }

      setTasks(data.tasks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  
  

  const handleSubmitTask = async (formData, isUpdate = false, taskId = null) => {
    const token = localStorage.getItem('token');
    const link = isUpdate
      ? `${url}/api/tasks/${taskId}?_method=PUT`
      : `${url}/api/tasks`;

    const method ='POST';

    const res = await fetch(link, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      setEditingTask(null); // clear edit state
      fetchTasks();
    } else {
      alert(`${isUpdate ? 'Update' : 'Create'} task failed`);
    }
  };

  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    const res = await fetch(`${url}/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      fetchTasks();
    } else {
      alert('Failed to delete task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, <span className="text-blue-600">{user?.email}</span>
        </h1>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition" >
          Logout
        </button>
      </div>

      <CreateTask
        onSubmit={handleSubmitTask}
        editingTask={editingTask}
        cancelEdit={() => setEditingTask(null)}
      />

      {loading ? (
        <p className="text-center text-gray-500 mt-6">Loading tasks...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-6">{error}</p>
      ) : (
        <TaskList
          tasks={tasks}
          onEdit={(task) => setEditingTask(task)}
          onDelete={handleDeleteTask}
        />
      )}

      {user?.role === 'admin' && (
  <div className="mt-10 flex justify-center">
    <Link
      to="/admin"
      className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
    >
      Go to Admin Panel
    </Link>
  </div>
)}


    </div>
  );
};

export default Dashboard;
