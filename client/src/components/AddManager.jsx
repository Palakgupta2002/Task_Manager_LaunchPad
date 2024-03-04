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
      const response = await fetch('http://localhost:5000/ManagerData/createManager', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data); // Handle success response
      alert('Manager Added Succesfully');
      setOpenModal(false)

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
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} >
        <div onClick={() => setOpenModal(false)} className='flex justify-end mr-5 text-2xl'>close</div>
        <Modal.Body>
          <div className='flex justify-center '>    
            <form onSubmit={handleSubmit} className='w-fit border-2 border-solid border-black shadow-lg p-10'>
            <div className='text-center text-2xl'>Add Manager</div>
              <div className='mt-3'>
                <label htmlFor="Musername">Username:</label><br />
                <input className='rounded-lg' type="text" id="Musername" name="Musername" value={formData.Musername} onChange={handleChange} required /><br />
              </div>
              <div className='mt-3'>
                <label htmlFor="Memail">Email:</label><br />
                <input className='rounded-lg' type="email" id="Memail" name="Memail" value={formData.Memail} onChange={handleChange} required /><br />
              </div>

              <div className='mt-3'>
                <label htmlFor="Mpassword">Password:</label><br />
                <input className='rounded-lg' type="password" id="Mpassword" name="Mpassword" value={formData.Mpassword} onChange={handleChange} required /><br />
              </div>
              <Button className='w-full mt-10' type="submit">Add Manager</Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddManager