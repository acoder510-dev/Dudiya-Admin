import express from "express";
import UserController from "../controller/userController.js";
import { UserAuth } from "../middleware/authMiddleware.js";

export default class UserRouter {
  constructor() {
    this.router = express.Router();
    this.init();
  }

  init() {
    // Get user profile
    this.router.get("/profile", UserAuth, UserController.getProfile);
    
    // Update user profile
    this.router.put("/profile", UserAuth, UserController.updateProfile);
    
    // Change password
    this.router.put("/change-password", UserAuth, UserController.changePassword);
    
    // Get user dashboard data
    this.router.get("/dashboard", UserAuth, UserController.getDashboard);
    
    // Get user statistics
    this.router.get("/statistics", UserAuth, UserController.getStatistics);
  }
}
