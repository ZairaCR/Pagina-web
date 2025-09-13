import { connectToDatabase } from '../../../utils/db'
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev'

export default async function handler(req, res) {
  const auth = req.headers.authorization || ''
  const token = auth.replace('Bearer ', '')
  if (!token) return res.status(401).json({ message: 'No token' })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    const { db } = await connectToDatabase()
    const user = await db.collection('users').findOne({ _id: payload.userId })
    if (!user) return res.status(404).json({ message: 'User not found' })
    // remove sensitive fields
    user.password = undefined
    return res.status(200).json({ user })
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
