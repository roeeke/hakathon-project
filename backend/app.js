const express = require('express');
const authRoutes = require('./Routes/AuthenticationRoutes');
const userRoutes = require('./Routes/UserRoutes');
const questionRoutes = require('./Routes/QuestionRoutes');
const memoryGameRoutes = require('./Routes/MemoryGameRoutes');
const racingGameRoutes = require('./Routes/RacingGameRoutes');
const app = express()
// const authRoutes = require('./routes/authRoutes')
var cors = require("cors")
app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes); // Authentication routes
app.use('/users', userRoutes); // User routes
app.use('/questions', questionRoutes); // Daily question routes
app.use('/memory-games', memoryGameRoutes); // Memory game routes
app.use('/racing-games', racingGameRoutes); // Racing game routes


module.exports = app