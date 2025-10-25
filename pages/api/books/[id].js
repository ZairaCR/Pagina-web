import { connectToDatabase } from '../../../utils/db'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev'

export default async function handler(req, res) {
  const { id } = req.query
  const { db } = await connectToDatabase()
  if (req.method === 'DELETE') {
    const auth = req.headers.authorization || ''
    const token = auth.replace('Bearer ', '')
    if (!token) return res.status(401).json({ message: 'No token' })
    try {
      const payload = jwt.verify(token, JWT_SECRET)
      if (payload.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
      await db.collection('books').deleteOne({ _id: new ObjectId(id) })
      return res.status(200).json({ message: 'Deleted' })
    } catch (e) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  }
  res.status(405).end()
}
