import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI");
}
export async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  await mongoose.connect(MONGODB_URI);
  return mongoose.connection;
}
