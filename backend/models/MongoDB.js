const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: "CipherSql",
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
