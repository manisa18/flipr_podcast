const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

const podcast = require("./routes/podcastRoute");
const auth = require("./routes/authRoute");
const user = require("./routes/userRoute");

app.use("/api/v1/podcast", podcast);
app.use("/api/v1", auth);
app.use("/api/v1/profile", user);

// Middleware;
app.use(errorMiddleware);

module.exports = app;
