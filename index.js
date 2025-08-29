import http from "http";
import app from "./src/app.js";
import {
  normalizePort,
  onError,
  onListening,
} from "./src/utils/serverHandlers.js";

const port = normalizePort(process.env.PORT || 8000);

app.set("port", port);

const server = http.createServer(app);

// server listen
server.listen(port);

// server handlers
server.on("error", (error) => onError(error, port));

server.on("listening", onListening.bind(server));

console.log("🌾 Dudiya Agricultural Management System Starting...");
console.log(`🚀 Server running on port ${port}`);
console.log(
  `📚 API Documentation available at http://localhost:${port}/api-docs`
);
