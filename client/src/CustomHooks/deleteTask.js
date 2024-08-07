const deletetask = async ({ email, taskId }) => {
  try {
    const response = await fetch(
      `https://task-manager-launchpad.onrender.com/deleteTask/${email}/tasks/${taskId}`,
      {
        method: 'DELETE',
      },
    )
    if (!response.ok) {
      throw new Error('Failed to delete task')
    }
    return await response.json()
  } catch (error) {
    console.error('Error deleting task:', error)
    throw error
  }
}

export default deletetask
