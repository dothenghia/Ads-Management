
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:2XvAi2UYqzSAhCRz@ads-management.skofr5r.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

async function closeMongoDBConnection() {
    try {
        await client.close();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
    }
}

module.exports = { client, connectToMongoDB, closeMongoDBConnection, };
