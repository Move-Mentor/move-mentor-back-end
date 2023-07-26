// Import port and host configurations
var { app, PORT, HOST } = require('./server');
const { databaseConnector } = require("./database");

// Initialise database
await databaseConnector();

// Run the server
app.listen(PORT, HOST, () => {
  console.log("The server is running");
});
