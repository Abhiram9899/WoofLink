const mongoose = require('mongoose');

// Function to connect to MongoDB with retry logic
const connectDB = async (retries = 5, delay = 5000) => {
  // Set Mongoose to use strictQuery for flexibility
  mongoose.set('strictQuery', false);

  // Event listeners for connection states
  mongoose.connection.on('connected', () => {
    console.log(`MongoDB Connected: ${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.name}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB Disconnected. Mongoose will attempt to reconnect automatically...');
  });

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB Connection Error: ${err.message}`);
  });

  // Retry logic for initial connection
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Connect to MongoDB
      await mongoose.connect(process.env.MONGO_URI, {
        // Explicitly specify the database name for clarity
        dbName: 'petcaretaker',
        // Mongoose handles reconnection automatically, no additional options needed
      });

      // Log successful connection and break the retry loop
      console.log('Initial MongoDB connection successful');
      break;
    } catch (error) {
      console.error(`Attempt ${attempt} - MongoDB Connection Failed: ${error.message}`);
      
      // If max retries reached, exit with failure
      if (attempt === retries) {
        console.error('Max retries reached. Exiting...');
        process.exit(1);
      }

      // Wait before retrying
      console.log(`Retrying in ${delay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Gracefully close the connection on process termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB Connection Closed');
    process.exit(0);
  } catch (err) {
    console.error(`Error closing MongoDB connection: ${err.message}`);
    process.exit(1);
  }
});

module.exports = connectDB;