import { MongoClient } from 'mongodb';
let client;
let collection;
async function connectDB() {
    client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    setCollection();
}
function setCollection() {
    collection = client.db('ZooKeeper').collection('Monki');
}
async function getDocCount() {
    return await collection.countDocuments();
}
async function addDoc(data) {
    const exists = await checkIfDoc(data.id);
    if (exists) {
        throw new Error('Already exists');
    }
    await collection.insertOne(data);
}
async function removeDoc(id) {
    await collection.deleteOne({ id });
}
async function getDoc(id) {
    return await collection.findOne({ id });
}
async function checkIfDoc(id) {
    return await collection.findOne({ id }) !== null;
}
export { connectDB, getDocCount, addDoc, removeDoc, getDoc };
