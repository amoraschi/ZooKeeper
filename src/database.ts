import { MongoClient, Collection, Document } from 'mongodb'
import { MonkifyData } from './utils/constants'

let client: MongoClient
let collection: Collection<Document>

async function connectDB (): Promise<void> {
  client = new MongoClient(process.env.MONGO_URL as string)
  await client.connect()
  setCollection()
}

function setCollection (): void {
  collection = client.db('ZooKeeper').collection('Monki')
}

async function getDocCount (): Promise<number> {
  return await collection.countDocuments()
}

async function addDoc (data: MonkifyData): Promise<void> {
  const exists = await checkIfDoc(data.id)

  if (exists) {
    throw new Error('Already exists')
  }

  await collection.insertOne(data)
}

async function removeDoc (id: string): Promise<void> {
  await collection.deleteOne({ id: id })
}

async function getDoc (id: string): Promise<Document | null> {
  return await collection.findOne({ id: id })
}

async function checkIfDoc (id: string): Promise<boolean> {
  return await collection.findOne({ id: id }) !== null
}

export {
  connectDB,
  getDocCount,
  addDoc,
  removeDoc,
  getDoc
}
