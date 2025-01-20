
'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import TaskForm from './TaskForm';
import { useParams } from 'react-router-dom';

const AddTask=({email1})=> {
  const [openModal, setOpenModal] = useState(false);
const id=useParams()

  return (
    <>
      <button className='text-3xl pl-10' onClick={() => setOpenModal(true)}> Add Task +</button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3>Add your task</h3>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              <TaskForm setOpenModal={setOpenModal} email={email1} projectId={id}/>
            </h3>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AddTask
