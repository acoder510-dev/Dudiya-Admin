import express from "express";
import LocationController from "../controller/admin/locationController.js";
import PublicController from "../controller/publicController.js";

export default class PublicRouter {
  constructor() {
    this.router = express.Router();
    this.init();
  }

  init() {
    // Get all locations
    this.router.get("/get-locations", LocationController.getLocations);

    // Get public data
    this.router.get("/get-public-data", PublicController.getPublicData);
  }
}
