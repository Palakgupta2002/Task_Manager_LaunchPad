import express from "express"
const router = express.Router();
import User from "../models/User.js"

// Route to fetch all users
router.get('/users', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Send the fetched users as a JSON response
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
