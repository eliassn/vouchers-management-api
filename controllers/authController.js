import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { createUserService } from '../services/userService.js'

const JWT_SECRET = process.env.JWT_SECRET || '123456789'

export async function registerController(req, res) {
  const userData = req.body
  try {
    const newUser = await createUserService(userData)
    console.log(newUser)
    return res.status(200).json(newUser)
  } catch (error) {
    res.send({ error })
  }
}

export async function loginController(req, res) {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '1h',
  })

  res.json({ token })
}
