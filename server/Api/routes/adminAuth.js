import express from "express"
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

 // MongoDB connection URI
const client = new MongoClient(process.env.MONGO_URL);

// Middleware to parse JSON request bodies
const router = express.Router();


// Route for admin login
// Route for admin login
router.post('/Adlogin', async (req, res) => {
    const { adminEmail, password } = req.body;

    try {
        // Connect to MongoDB
        await client.connect();
        const database = client.db('test');
        const adminCollection = database.collection('Admin');

       
        const admin = await adminCollection.findOne({ adminEmail });

        if (!admin) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare passwords
        if (password !== admin.password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ isAdmin:"true" }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        res.json({msg:"Admin login successfully",token, isAdmin:"true"});
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        // Close the MongoDB connection
        await client.close();
    }
});

export default router


