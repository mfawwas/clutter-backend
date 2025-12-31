const mongoose = require("mongoose");
require("dotenv").config();

const MONGOURI = process.env.MONGO_URI;

const DBconnect = async () => {
  try {
    await mongoose.connect(MONGOURI);
    console.log("Database connection successfull");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

module.exports = DBconnect;
