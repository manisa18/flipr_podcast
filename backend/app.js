const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");

const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());

const podcast = require("./routes/podcastRoute");
const auth = require("./routes/authRoute");
const user = require("./routes/userRoute");

app.use("/api/v1/podcast", podcast);
app.use("/", auth);
app.use("/api/v1/profile", user);

// Middleware;
app.use(errorMiddleware);

module.exports = app;
