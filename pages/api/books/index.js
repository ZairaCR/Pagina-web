import { connectToDatabase } from '../../../utils/db'
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || 'secret_dev'

export default async function handler(req, res) {
  const { db } = await connectToDatabase()

  if (req.method === 'GET') {
    const books = await db.collection('books').find().sort({ createdAt: -1 }).toArray()
    return res.status(200).json(books)
  }

  if (req.method === 'POST') {
    const auth = req.headers.authorization || ''
    const token = auth.replace('Bearer ', '')
    if (!token) return res.status(401).json({ message: 'No token' })
    try {
      const payload = jwt.verify(token, JWT_SECRET)
      // only admin can add
      if (payload.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
      const { title, author } = req.body
      if (!title || !author) return res.status(400).json({ message: 'Missing fields' })
      const book = { title, author, createdAt: new Date() }
      const r = await db.collection('books').insertOne(book)
      book._id = r.insertedId
      return res.status(201).json(book)
    } catch (e) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  }

  res.status(405).end()
}
