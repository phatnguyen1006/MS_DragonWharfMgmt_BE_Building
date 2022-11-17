const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
function connectDB() {
    const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    mongoose.connect(process.env.MONGO_URI, mongooseOptions, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connect to database successfully!");
        }
    });
}

module.exports = {
    connectDB
};