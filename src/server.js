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

module.exports = { 
  app 
}