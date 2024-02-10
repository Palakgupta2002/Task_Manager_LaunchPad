import express from "express"
import User from "../models/User.js"

const router = express()

// Route to delete a user by email
router.delete('/:email', async (req, res) => {
    const email = req.params.email;

    try {
        // Find the user by email and delete it
        const deletedUser = await User.findOneAndDelete({ email });
        
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If user is deleted successfully, return success message
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router
