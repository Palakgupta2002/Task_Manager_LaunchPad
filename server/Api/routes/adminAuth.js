const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');

 // MongoDB connection URI
const client = new MongoClient(process.env.MONGO_);

// Middleware to parse JSON request bodies
const router = express.Router();

// Add body-parser middleware to parse request bodies
router.use(bodyParser.json());

// Route for admin login
router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Connect to MongoDB
        await client.connect();
        const database = client.db('');
        const adminCollection = database.collection('Admin');

        // Query admin collection for the provided username
        const admin = await adminCollection.findOne({ username });

        if (!admin) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id, username: admin.username }, 'your_secret_key', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        // Close the MongoDB connection
        await client.close();
    }
});

