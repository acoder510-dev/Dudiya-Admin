import logger from "./logger.js";

/**
 * @param  {number|string|boolean} port
 */
export function normalizePort(val) {
  const port = typeof val === "string" ? parseInt(val, 10) : val;

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

/**
 * @param  {NodeJS.ErrnoException} error
 */
export function onError(error, port) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

export function onListening() {
  const addr = this.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log("\x1b[33m" + `Server listening on port ${addr.port}`, "\x1b[0m");
  logger.info(`Server listening on port ${addr.port}`);
}
