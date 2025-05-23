import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No tasks available.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Task List</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  task.status === 'Completed'
                    ? 'bg-green-100 text-green-800'
                    : task.status === 'In Progress'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {task.status}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{task.description}</p>
            <div className="text-sm text-gray-500">
              <p>
                Priority: <strong>{task.priority}</strong>
              </p>
              <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>Assigned To: {task.assignedTo?.email || 'Unassigned'}</p>
            </div>

            {task.documents?.length > 0 && (
              <div className="mt-3">
                <p className="font-medium">Documents:</p>
                <ul className="list-disc ml-5 text-sm text-blue-700">
                  {task.documents.map((doc, index) => (
                    <li key={index}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {doc.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => onEdit(task)}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="text-red-600 hover:underline text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
