import express from "express";
import Middleware from "./middleware/middleware.js";
import Routes from "./router/routes.js";
import { config } from "dotenv";
// import CronJobs from "./cron/jobs.js";
import dbConnection from "./config/connection.js";

/**
 * @class App
 */
export class App {
  // set app to be of type express.Application
  constructor() {
    config();
    this.app = express();
    dbConnection();
    Middleware.init(this);
    Routes.init(this);
    // CronJobs.init();
  }
}

export default new App().app;
