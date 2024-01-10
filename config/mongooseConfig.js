const mongoose = require('mongoose');

const uri = 'mongodb+srv://admin:2XvAi2UYqzSAhCRz@ads-management.skofr5r.mongodb.net/Ads-Management?retryWrites=true&w=majority';

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
