// Import port and host configurations
var { app, PORT } = require('./server');
const { databaseConnector } = require("./database");

// Initialise database
databaseConnector().then(() => {
  // Run the server
  app.listen(PORT, () => {
    console.log("The server is running");
  });
}).catch((error) => {
  console.error("Could not initialise the database.");
  process.exit(1);
});


