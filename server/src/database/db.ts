const mongoose = require('mongoose');
const { info, error } = require('node:console');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    info('Server connected to MongoDB');
  } catch (err) {
    error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
