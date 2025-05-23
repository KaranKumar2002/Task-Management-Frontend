import React, { useState, useEffect } from 'react';

const CreateTask = ({ onSubmit, editingTask = null, cancelEdit }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '',
  });

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (editingTask) {
      setTask({
        title: editingTask.title || '',
        description: editingTask.description || '',
        status: editingTask.status || 'Pending',
        priority: editingTask.priority || 'Medium',
        dueDate: editingTask.dueDate ? editingTask.dueDate.split('T')[0] : '',
      });
      setDocuments([]); // do not carry over old docs, must re-upload
    } else {
      setTask({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Medium',
        dueDate: '',
      });
      setDocuments([]);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert('You can upload a maximum of 3 documents.');
      return;
    }
    setDocuments(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(task).forEach(([key, value]) => {
      formData.append(key, value);
    });
    documents.forEach((file) => formData.append('documents', file));

    onSubmit(formData, !!editingTask, editingTask?._id);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {editingTask ? 'Edit Task' : 'Create New Task'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            required
            value={task.title}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Attach up to 3 PDF documents</label>
          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {editingTask ? 'Update Task' : 'Create Task'}
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-gray-600 underline font-medium"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
