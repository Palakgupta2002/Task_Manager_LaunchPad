import express from 'express'
import Manager from '../models/ManagerSchema.js'
const router = express.Router()
import jwt from 'jsonwebtoken'

// GET all managers
router.get('/', async (req, res) => {
  try {
    const managers = await Manager.find()
    const token = jwt.sign(
      { email: managers.Memail },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' },
    )
    return res.json({ message: 'Sign-in successful', token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/getOneManager/:Memail', async (req, res) => {
  const { Memail } = req.params

  try {
    const manager = await Manager.findOne({ Memail })

    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' })
    }

    return res.json(manager)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

router.post('/createManager', async (req, res) => {
  const manager = new Manager({
    Musername: req.body.Musername,
    Memail: req.body.Memail,
    Mpassword: req.body.Mpassword,
  })

  try {
    const newManager = await manager.save()
    res.status(201).json(newManager)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// UPDATE a manager
router.patch('/UpdateManager/:id', getManager, async (req, res) => {
  if (req.body.username != null) {
    res.manager.username = req.body.username
  }
  if (req.body.email != null) {
    res.manager.email = req.body.email
  }
  if (req.body.password != null) {
    res.manager.password = req.body.password
  }
  try {
    const updatedManager = await res.manager.save()
    res.json(updatedManager)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/deleteManager/:id', getManager, async (req, res) => {
  try {
    await res.manager.remove()
    res.json({ message: 'Manager deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//for login
router.post('/login', async (req, res) => {
  const { Memail, Mpassword } = req.body

  try {
    const manager = await Manager.findOne({ Memail })
    if (!manager) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    if (!Mpassword) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign(
      { email: manager.Memail, isAdmin: false },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' },
    )
    res.json({ email: manager.Memail, token })
  } catch (error) {
    console.error('Error during manager login:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

async function getManager(req, res, next) {
  let manager
  try {
    manager = await Manager.findById(req.params.id)
    if (manager == null) {
      return res.status(404).json({ message: 'Manager not found' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.manager = manager
  next()
}

export default router
