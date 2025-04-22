import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const JWT_SECRET = process.env.JWT_SECRET || '123456789'

/**
 * Middleware to check if user is authenticated
 */
export function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

/**
 * Middleware to check if user is an admin
 */
export async function isAdmin(req, res, next) {
  try {
    const user = await User.findById(req.user.id)
    if (user && user.role === 'admin') {
      next()
    } else {
      res.status(403).json({ error: 'Admin access required' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}
