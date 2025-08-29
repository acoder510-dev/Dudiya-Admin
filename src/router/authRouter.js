import { Router } from "express";
import AuthController from "../controller/authController.js";

/**
 * @class AuthRouter
 */
export default class AuthRouter {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes = () => {
    // auth router
    this.router.post("/login", AuthController.login);
    this.router.post("/verify-otp", AuthController.verifyOtp);
    this.router.post("/resend-otp", AuthController.resendOtp);
  };
}
