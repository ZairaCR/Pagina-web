import { connectToDatabase } from '../../../utils/db'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' })

  const { db } = await connectToDatabase()
  const existing = await db.collection('users').findOne({ email })
  if (existing) return res.status(400).json({ message: 'User exists' })

  const hash = await bcrypt.hash(password, 10)
  // first registered user becomes admin (convenience)
  const usersCount = await db.collection('users').countDocuments()
  const role = usersCount === 0 ? 'admin' : 'user'

  const user = { name, email, password: hash, role, createdAt: new Date() }
  await db.collection('users').insertOne(user)
  return res.status(201).json({ message: 'Created' })
}
