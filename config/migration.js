// migration.js
const admin = require('./firebase-admin')
const { client, connectToMongoDB, closeMongoDBConnection, } = require('./mongodbConfig');

async function migrateData(firestore, mongoClient, dbName) {
  try {
    await mongoClient.connect();
    console.log('Connected to MongoDB');

    const firestoreCollection = firestore.collection('yourFirestoreCollection'); // Update with your Firestore collection name
    const mongoCollection = mongoClient.db(dbName).collection('yourMongoDBCollection'); // Update with your MongoDB collection name

    const firestoreSnapshot = await firestoreCollection.get();
    const firestoreData = [];

    firestoreSnapshot.forEach((doc) => {
      firestoreData.push(doc.data());
    });

    if (firestoreData.length > 0) {
      await mongoCollection.insertMany(firestoreData);
      console.log('Data migrated successfully!');
    } else {
      console.log('No data to migrate.');
    }
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await mongoClient.close();
    console.log('Disconnected from MongoDB');
  }
}

module.exports = migrateData;
