import express from "express"
import Manager from "../models/ManagerSchema.js"
const router = express.Router();

// GET all managers
router.get('/', async (req, res) => {
  try {
    const managers = await Manager.find();
    res.json(managers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one manager
router.get('/getOneManager/:id', getManager, (req, res) => {
  res.json(res.manager);
});

// CREATE a manager
router.post('/createManager', async (req, res) => {
  const manager = new Manager({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const newManager = await manager.save();
    res.status(201).json(newManager);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a manager
router.patch('/UpdateManager/:id', getManager, async (req, res) => {
  if (req.body.username != null) {
    res.manager.username = req.body.username;
  }
  if (req.body.email != null) {
    res.manager.email = req.body.email;
  }
  if (req.body.password != null) {
    res.manager.password = req.body.password;
  }
  try {
    const updatedManager = await res.manager.save();
    res.json(updatedManager);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a manager
router.delete('/deleteManager/:id', getManager, async (req, res) => {
  try {
    await res.manager.remove();
    res.json({ message: 'Manager deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//for login
router.post('/login', async (req, res) => {
    const { Memail, Mpassword } = req.body;

    try {
        // Check if the manager exists in the database
        const manager = await Manager.findOne({ Memail });
        if (!manager) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(Mpassword, manager.Mpassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If credentials are valid, generate a JWT token
        const token = jwt.sign({ id: manager._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token to the client
        res.json({ token });
    } catch (error) {
        console.error('Error during manager login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


async function getManager(req, res, next) {
  let manager;
  try {
    manager = await Manager.findById(req.params.id);
    if (manager == null) {
      return res.status(404).json({ message: 'Manager not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.manager = manager;
  next();
}

export default router;
