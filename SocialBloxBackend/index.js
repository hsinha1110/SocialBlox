const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comment");

dotenv.config();

// Middleware
// app.use(morgan("dev")); // Log HTTP requests in development
app.use(helmet()); // Set various HTTP headers for security
app.use(express.json()); // Parse JSON data from the request body

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongo database connected successfully"));

// Routes
app.use("/socialapp/api/users", userRouter);
app.use("/socialapp/api/auth", authRouter);
app.use("/socialapp/api/post", postRouter);
app.use("/socialapp/api/post/comment", commentRouter);

const PORT = process.env.PORT || 8200;
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
