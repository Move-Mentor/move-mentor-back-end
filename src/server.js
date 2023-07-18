const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/", (request, response) => {
  response.json({
    message: "Welcome to the Move Mentor backend"
  });
});

const usersRouter = require('./routes/users_routes')
app.use("/users", usersRouter)

const optionsRouter = require('./routes/options_routes')
app.use("/options", optionsRouter)

const classesRouter = require('./routes/classes_routes')
app.use("/classes", classesRouter)

const movesRouter = require('./routes/moves_routes')
app.use("/moves", movesRouter)

module.exports = { 
  app 
}