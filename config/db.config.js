const mongoose = require('mongoose');
// const config = require('config');
// const db = config.get("mongoURI");
require("dotenv").config();
const db = process.env.mongoURI
/**
 * mongoDB connection creation
 */
const connectDB = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(db, {
            useNewUrlParser: true,
        });
        console.log("MongoDB is Connected...");
    } catch (err) {
        console.error(err.message);

    }
};

module.exports = connectDB;
