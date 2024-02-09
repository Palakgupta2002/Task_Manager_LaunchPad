import express from "express";
import bodyParser from "body-parser";
import bcryptjs from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// Add body-parser middleware to parse request bodies
router.use(bodyParser.json());

router.post('/signIn', async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        
        // At this point, user is authenticated
        return res.json({ message: 'Sign-in successful', user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
