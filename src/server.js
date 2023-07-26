// Ensure .env data is ready for use
const dotenv = require('dotenv')
dotenv.config();

// Import Express and Mongoose and create the Express app instance
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Set default port and host values if the process.env. values are not found
const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || '127.0.0.1'

// Configure Helmet settings
const helmet = require('helmet');
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"]
  }
}));

// Configure cors settings
const cors = require('cors');
var corsOptions = {
  origin: ["http://localhost:3000", "https://move-mentor.netlify.app"],
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Configure data formatting settings for APIs
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Configure app to return database health details
app.get("/databaseHealth", (request, response) => {
  let databaseState = mongoose.connection.readyState;
  let databaseName = mongoose.connection.name;
  let databaseModels = mongoose.connection.modelNames();
  let databaseHost = mongoose.connection.host;

  response.json({
    readyState: databaseState,
    dbName: databaseName,
    dbModels: databaseModels,
    dbHost: databaseHost
  })
});

app.get("/", (request, response) => {
  response.json({
    message: "Welcome to the Move Mentor backend"
  });
});

const usersRouter = require('./routes/users_routes')
app.use("/users", usersRouter)

const optionsRouter = require('./routes/options_routes')
app.use("/options", optionsRouter)

const lessonsRouter = require('./routes/lessons_routes')
app.use("/lessons", lessonsRouter)

const movesRouter = require('./routes/moves_routes')
app.use("/moves", movesRouter)

// Custom 404 error message when the specified route was not found
app.get("*", (request, response) => {
  response.status(404).json({
    Message: "The specified route was not found",
    attemptedPath: request.path
  });
});

module.exports = {
  HOST,
  PORT,
  app
}