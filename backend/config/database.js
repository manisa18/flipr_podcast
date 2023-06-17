const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(
      // "mongodb://0.0.0.0:27017/podcast",
      process.env.DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Connected to MongoDB successfully");
    });
};
module.exports = connectDatabase;
