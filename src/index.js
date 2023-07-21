// Import port and host configurations
var { app, PORT, HOST } = require('./server');

// Run the server
app.listen(PORT, HOST, () => {
  console.log("The server is running");
});
