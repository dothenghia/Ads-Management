// Import Mongoose
const mongoose = require('mongoose');

// MongoDB connection URI (replace with your actual URI)
const uri = 'mongodb+srv://admin:2XvAi2UYqzSAhCRz@ads-management.skofr5r.mongodb.net/Ads-Management?retryWrites=true&w=majority';

// Connect to MongoDB function
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Event listener for connection error
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Event listener for connection success
mongoose.connection.on('open', () => {
  console.log('MongoDB connection opened');
});

// Event listener for disconnection
mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Close MongoDB connection function
const closeMongoDBConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};

module.exports = {connectToMongoDB, closeMongoDBConnection,};
