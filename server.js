const app = require("./backend/app");
const http = require("http");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || "3000");
// app.set("port", port);

const server = http.createServer(app);
// server.on("error", onError);
// server.on("listening", onListening);
server.listen(port);
