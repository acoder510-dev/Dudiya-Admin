import config from "../config/config.js";
import jwt from "jsonwebtoken";

class Methods {
  /**
   * @description Function to generate OTP
   * @returns { String }
   */
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  /**
   * @description Function to generate JWT token
   * @returns { String }
   */
  newToken(data) {
    return jwt.sign(data, config.JWT_SECRET);
  }

  /**
   * @description Function to generate JWT token for expire time
   * @returns { String }
   */
  newTimeToken(data, time) {
    return jwt.sign(data, config.JWT_SECRET, {
      expiresIn: time,
    });
  }

  /**
   * @description Function to verify JWT token
   * @returns { String }
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
      return false;
    }
  }

  calculateAge(dob) {
    if (!dob) {
      return 0;
    }
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  generateUserName(role, country, id) {
    let userName =
      country?.toUpperCase() +
      role?.charAt(0)?.toUpperCase() +
      id?.slice(12, 24)?.toUpperCase();

    return userName;
  }
}
export default new Methods();
