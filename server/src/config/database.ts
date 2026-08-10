import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";

dotenv.config();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error("MONGO_URI není nastavena v .env");
    }

    await mongoose.connect(MONGO_URI);

    console.log("Úspěšné připojení k databázi");
  } catch (error) {
    console.error("K databázi se nepodařilo připojit:", error);
    process.exit(1);
  }
};

export default connectDB;
