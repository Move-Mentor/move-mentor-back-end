const env = require('./environment');

// Import the Mongoose module
const mongoose = require('mongoose');

// Configure database connection environment settings
var databaseURL = "";
switch (env.NODE_ENV) {
  case "test":
    databaseURL = "mongodb://localhost:27017/move_mentor_test";
    break;
  case "development":
    databaseURL = "mongodb://localhost:27017/move_mentor_development";
    break;
  case "production":
    databaseURL = env.DATABASE_URL;
    break;
  default:
    console.error("Incorrect environment specified, cannot connect to the database.");
    break;
}

// Configure database connection and disconnection
async function databaseConnector() {
  try {
    await mongoose.connect(databaseURL);
  } catch (error) {
    console.log(`An error occurred when connecting to the database. Error details: ${error}`);
    console.log(error)
  }
}

async function databaseDisconnector() {
  await mongoose.connection.close();
}

module.exports = {
  databaseConnector,
  databaseDisconnector
}