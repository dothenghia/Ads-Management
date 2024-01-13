const mongoose = require('mongoose');
require('dotenv').config();
database_url = process.env.DATABASE_URL;
database_name = process.env.DATABASE_NAME;
indexing = database_url.indexOf('?');
full_url = database_url.slice(0,indexing) + database_name +  database_url.slice(indexing)
// console.log(full_url)
const uri = full_url;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('open', () => {
  console.log('MongoDB connection opened');
});

// mongoose.connection.on('disconnected', () => {
//   console.log('Disconnected from MongoDB');
// });

const closeMongoDBConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};

module.exports = {connectToMongoDB, closeMongoDBConnection,};
