import express from "express";
import MemberController from "../controller/memberController.js";
import { MemberAuth } from "../middleware/authMiddleware.js";

export default class MemberRouter {
  constructor() {
    this.router = express.Router();
    this.init();
  }

  init() {
    // Get member profile
    this.router.get("/profile", MemberAuth, MemberController.getProfile);

    // Update member profile
    this.router.put("/profile", MemberAuth, MemberController.updateProfile);

    // Get member farms
    this.router.get("/farms", MemberAuth, MemberController.getFarms);

    // Get member statistics
    this.router.get("/statistics", MemberAuth, MemberController.getStatistics);
  }
}
