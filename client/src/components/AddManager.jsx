import { Button, Modal } from 'flowbite-react'
import React, { useState } from 'react'

const AddManager = () => {
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        Musername: '',
        Memail: '',
        Mpassword: ''
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          const data = await response.json();
          console.log(data); // Handle success response
          alert('Signup successful!');
          // Optionally, redirect to another page
          // history.push('/login');
        } catch (error) {
          console.error('Error during signup:', error);
          alert('Signup failed. Please try again.');
        }
      };
  return (
    <>
    <Button outline onClick={() => setOpenModal(true)}>Add Manager</Button>
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Add a manager</Modal.Header>
      <Modal.Body>
      <div className='flex justify-center'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Musername">Username:</label><br />
        <input type="text" id="Musername" name="Musername" value={formData.Musername} onChange={handleChange} required /><br />

        <label htmlFor="Memail">Email:</label><br />
        <input type="email" id="Memail" name="Memail" value={formData.Memail} onChange={handleChange} required /><br />

        <label htmlFor="Mpassword">Password:</label><br />
        <input type="password" id="Mpassword" name="Mpassword" value={formData.Mpassword} onChange={handleChange} required /><br />

        <Button type="submit">Signup</Button>
      </form>
    </div>
      </Modal.Body>
    </Modal>
  </>
  )
}

export default AddManager