const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const error = require("./middleware/error");

process.on("uncaughtException", (err) => {
  console.log(err.message);
  console.log(`Uncaught Exception`);
  process.exit(1);
});

dotenv.config({ path: "config/config.env" });
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.message);
  console.log("Shutting Down");
  server.close(() => {
    process.exit(1);
  });
});
