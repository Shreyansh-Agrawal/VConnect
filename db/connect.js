import mongoose from "mongoose";

const connectDB = (url) => {
  console.log("Connected to DB!");
  return mongoose.connect(url);
};

export default connectDB;
