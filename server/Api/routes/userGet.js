import express from 'express';
import User from '../models/User.js'; // Assuming you have a User model

const router = express.Router();

// GET user data by email
router.get('/users/:email', async (req, res) => {
    try {
        const { email } = req.params;
        
        // Find the user by email
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
