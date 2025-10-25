import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || ''
if (!uri) console.warn('MONGODB_URI not set in env')

let client
let clientPromise

if (!global._mongoClientPromise) {
  client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

export async function connectToDatabase() {
  const client = await clientPromise
  const db = client.db() // uses default database from connection string
  return { client, db }
}
