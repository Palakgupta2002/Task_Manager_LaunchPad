
'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import TaskForm from './TaskForm';

const AddTask=()=> {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button onClick={() => setOpenModal(true)}>Add Task</button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3>Add your task</h3>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              <TaskForm setOpenModal={setOpenModal}/>
            </h3>
            {/* <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(false)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div> */}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AddTask
