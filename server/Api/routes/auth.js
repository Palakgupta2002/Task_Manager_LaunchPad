import express from "express";
import bodyParser from "body-parser";
import bcryptjs from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// Add body-parser middleware to parse request bodies
router.use(bodyParser.json());

router.post('/signUp', async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === "" || email === "" || password === "") {
        console.log('all field are requires');
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword ? hashedPassword : password
    });
    try {
        await newUser.save();
        return res.json("Signup Successfully");
    } catch (error) {
        res.json(error)
     console.log(error)
    }
});

export default router;
