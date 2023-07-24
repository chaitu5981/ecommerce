const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB);
    console.log(`Connected to Mongodb Database ${conn.connection.host}`);
  } catch (error) {
    console.log(`Database connection error ${error}`);
  }
};

module.exports = connectDB;
