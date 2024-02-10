import React from 'react';

const TaskCard = ({ tasks, onCheckboxChange, onDelete }) => {
    if (!tasks) {
        return null; // Render nothing if task is undefined
    }
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-fit">
      <h3 className="text-lg font-semibold mb-2">{tasks.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{tasks.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <input
            type="checkbox"
            id={`task-${tasks.id}`}
            checked={tasks.completed}
            onChange={() => onCheckboxChange(tasks.id)}
            className="mr-2"
          />
          <label htmlFor={`task-${tasks.id}`} className="text-sm text-gray-700">Completed</label>
        </div>
        <button
          onClick={() => onDelete(tasks.id)}
          className="text-sm text-red-600 hover:text-red-700 focus:outline-none"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
