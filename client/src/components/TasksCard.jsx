import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';

const TaskCard = ({ tasks, onCheckboxChange }) => {
    const [openModal, setOpenModal] = useState(false);
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
            className="mr-2"
          />
          <label htmlFor={`task-${tasks.id}`} className="text-sm text-gray-700">Completed</label>
        </div>
        <button
          className="text-sm text-red-600 hover:text-red-700 focus:outline-none"
        >
          Delete
        </button>
        <>
      <button onClick={() => setOpenModal(true)}>see details</button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <div>
               {tasks.title} 
               {tasks.description}
            </div>
            
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(false)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>

      </div>
    </div>
  );
};

export default TaskCard;
