const deleteUser = async (email) => {
  try {
    const response = await fetch(`https://task-manager-launchpad.onrender.com/deleteUser/${email}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete user')
    }
    return await response.json()
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}
export default deleteUser
