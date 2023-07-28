// Import port and host configurations
var { app, PORT, HOST } = require('./server');
const { databaseConnector } = require("./database");

// Initialise database
databaseConnector().then(() => {
  // Run the server
  app.listen(PORT, HOST, () => {
    console.log("The server is running");
  });
}).catch((error) => {
  console.error("Could not initialise the database.");
  process.exit(1);
});


