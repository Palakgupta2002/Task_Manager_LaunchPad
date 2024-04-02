import { Button, Modal } from 'flowbite-react'
import React, { useState } from 'react'
import ProjectForm from './ProjectForm';

const CreateProject = () => {
    const [openModal, setOpenModal] = useState(false);
  return (
    <div>
    <Button onClick={() => setOpenModal(true)}>Create Project</Button>
    <Modal  show={openModal} size="6xl" onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
       <ProjectForm/>
      </Modal.Body>
    </Modal>
  </div>
  )
}

export default CreateProject