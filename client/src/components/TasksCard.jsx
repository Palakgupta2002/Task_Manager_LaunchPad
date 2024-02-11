import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import deletetask from '../CustomHooks/deleteTask';
import { useContext } from 'react';
import { EmailContext } from '../App';

const TaskCard = ({ tasks }) => {
  const { adminLog, email } = useContext(EmailContext);
  const [openModal, setOpenModal] = useState(false);
  

 
     const handleComplete = async () => {
        try {
          // Call the API to update the task's completion status
          const response = await fetch(`http://localhost:5000/updateTask/${email}/tasks/${tasks._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              completed: true // Toggle the completion status
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to update task completion status');
          }

          // If the API call is successful, refresh the task data or update the UI
        } catch (error) {
          console.error('Error updating task completion status:', error);
          // Handle error if needed
        }
      };

      const handleTask = async () => {
        try {
          await deletetask({ email: tasks.email, taskId: tasks._id });
          // Task deleted successfully, you can perform any additional actions here if needed
        } catch (error) {
          // Handle any errors that occurred during task deletion
          console.error('Error deleting task:', error);
        }
      };
      
        
       
          

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
            onChange={handleComplete} // Toggle modal on checkbox change
          />
          <label htmlFor={`task-${tasks._id}`} className="text-sm text-gray-700">
            Completed
          </label>
        </div>
        {adminLog ? (
          <button className="text-sm text-red-600 hover:text-red-700 focus:outline-none" onClick={handleTask}>
            Delete
          </button>
        ) : (
          ''
        )}
        <>
          <button onClick={() => setOpenModal(true)}>edit</button>
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
