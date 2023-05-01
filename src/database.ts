import {MongoClient, Collection, Document} from 'mongodb'
import {MonkifyData} from './utils/constants'

let client: MongoClient
let collection: Collection<Document>

async function connectDB(): Promise<void> {
    client = new MongoClient(process.env.MONGO_URL as string)
    await client.connect()
    setCollection()
}

function setCollection(): void {
    collection = client.db('ZooKeeper').collection('Monki')
}

async function getAllDocs(): Promise<Collection> {
    return collection;
}

async function addBulkDoc(data: MonkifyData[]): Promise<void> {
    await collection.insertMany(data);
}

async function getDocCount(): Promise<number> {
    return await collection.countDocuments()
}

async function addDoc(data: MonkifyData): Promise<void> {
    const exists = await checkIfDoc(data.id)

    if (exists) {
        throw new Error('Already exists')
    }

    await collection.insertOne(data)
}

async function getNewestDoc(): Promise<MonkifyData | null> {
    return await collection.find().limit(1).sort({$natural: -1}).next() as unknown as MonkifyData
}

async function getLongestReasonDoc(): Promise<MonkifyData | null> {
    return await collection.find().limit(1).sort({reason: 1}).next() as unknown as MonkifyData
}

async function getShortestReasonDoc(): Promise<MonkifyData | null> {
    return await collection.find().limit(1).sort({reason: -1}).next() as unknown as MonkifyData
}

async function removeDoc(id: string): Promise<void> {
    await collection.deleteOne({id})
}

async function getDoc(id: string): Promise<MonkifyData | null> {
    return await collection.findOne({id}) as unknown as MonkifyData
}

async function checkIfDoc(id: string): Promise<boolean> {
    return await collection.findOne({id}) !== null
}

async function getRandomDoc(): Promise<MonkifyData | null> {
    const count = await getDocCount()
    const random = Math.floor(Math.random() * count)

    return await collection.find().limit(1).skip(random).next() as unknown as MonkifyData
}

export {
    addBulkDoc,
    getAllDocs,
    connectDB,
    getDocCount,
    addDoc,
    getNewestDoc,
    getLongestReasonDoc,
    getShortestReasonDoc,
    removeDoc,
    getDoc,
    getRandomDoc
}
