// Import the Mongoose module
const mongoose = require('mongoose');

// Configure database connection and disconnection
async function databaseConnector(databaseURL){
  await mongoose.connect(databaseURL);
}

async function databaseDisconnector(){
  await mongoose.connection.close();
}

module.exports = {
  databaseConnector,
  databaseDisconnector
}