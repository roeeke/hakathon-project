const express = require("express");
const authRoutes = require("./Routes/AuthenticationRoutes");
const userRoutes = require("./Routes/UserRoutes");
const questionRoutes = require("./Routes/QuestionRoutes");
const memoryGameRoutes = require("./Routes/MemoryGameRoutes");
// const raceGameRoutes = require('./Routes/raceGameRoutes');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/auth", authRoutes); // Authentication routes
app.use("/users", userRoutes); // User routes
app.use("/questions", questionRoutes); // Daily question routes
app.use("/api/memory-games", memoryGameRoutes); // Memory game routes
// app.use('/racegame', raceGameRoutes);
module.exports = app;
