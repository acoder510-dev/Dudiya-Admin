import CreateRepo from "../repo/createRepo.js";
import FindRepo from "../repo/findRepo.js";
import UpdateRepo from "../repo/updateRepo.js";
import logger from "../utils/logger.js";
import { Messages } from "../utils/messages.js";
import methods from "../utils/methods.js";
import Mailer from "../utils/sendMail.js";

class AuthService {
  async login({ role, email }) {
    try {
      let data;
      let user = {};

      data = await new FindRepo("UserModel").findOne(
        { email },
        { _id: 1, is_block: 1, role: 1 }
      );

      if (data && data?.role != role)
        return {
          status: process.env.BAD_REQUEST,
          message: `${
            data?.role.charAt(0).toUpperCase() + data?.role.slice(1)
          } ${Messages.ALREADY_EXIST}`,
        };

      if (data?.is_block)
        return {
          status: process.env.BAD_REQUEST,
          message: Messages.BLOCKED,
        };

      if (!data) {
        const otp = methods.generateOTP();
        logger.info(`OTP: ${otp}`);
        
        // Create user based on role
        if (role === "field_user") {
          user = await new CreateRepo("UserModel").create({
            email,
            role,
            otp,
            otpTime: new Date(),
            is_block: false,
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            country: "",
            zipCode: "",
            status: true,
          });
        } else if (role === "admin" || role === "super_admin") {
          user = await new CreateRepo("UserModel").create({
            email,
            role,
            otp,
            otpTime: new Date(),
            is_block: false,
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            country: "",
            zipCode: "",
            status: true,
          });
        }
        
        await Mailer.sendMail(email, "loginEmail", {
          otp,
        });
      } else {
        const otp = methods.generateOTP();
        logger.info(`OTP: ${otp}`);
        user = await new UpdateRepo("UserModel").updateWithId(data?._id, {
          otp,
          otpTime: new Date(),
        });
        await Mailer.sendMail(email, "loginEmail", {
          otp,
        });
      }
      if (!user) throw new Error("Unable to login");
      return {
        status: process.env.SUCCESS,
        message: Messages.OTP_SENT,
      };
    } catch (err) {
      return {
        status: process.env.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async verifyOTP({ email, otp, role }) {
    try {
      const data = await new FindRepo("UserModel").findOne(
        { email, otp, role },
        { _id: 1, is_block: 1, role: 1 }
      );

      if (!data)
        return {
          status: process.env.BAD_REQUEST,
          message: Messages.INVALID_OTP,
        };

      if (data?.is_block)
        return {
          status: process.env.BAD_REQUEST,
          message: Messages.BLOCKED,
        };

      const otpTime = new Date(data.otpTime);
      const currentTime = new Date();
      const timeDiff = (currentTime - otpTime) / 1000 / 60; // in minutes

      if (timeDiff > 10)
        return {
          status: process.env.BAD_REQUEST,
          message: Messages.OTP_EXPIRED,
        };

      const token = methods.generateToken({ id: data._id, role: data.role });
      const refreshToken = methods.generateRefreshToken({ id: data._id, role: data.role });

      await new UpdateRepo("UserModel").updateWithId(data._id, {
        otp: null,
        otpTime: null,
        lastLogin: new Date(),
      });

      return {
        status: process.env.SUCCESS,
        message: Messages.LOGIN_SUCCESS,
        data: {
          token,
          refreshToken,
          user: {
            id: data._id,
            role: data.role,
          },
        },
      };
    } catch (err) {
      return {
        status: process.env.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async resendOTP({ email, role }) {
    try {
      const data = await new FindRepo("UserModel").findOne(
        { email, role },
        { _id: 1, is_block: 1 }
      );

      if (!data)
        return {
          status: process.env.BAD_REQUEST,
          message: Messages.USER_NOT_FOUND,
        };

      if (data?.is_block)
        return {
          status: process.env.BAD_REQUEST,
          message: Messages.BLOCKED,
        };

      const otp = methods.generateOTP();
      logger.info(`OTP: ${otp}`);

      await new UpdateRepo("UserModel").updateWithId(data._id, {
        otp,
        otpTime: new Date(),
      });

      await Mailer.sendMail(email, "loginEmail", {
        otp,
      });

      return {
        status: process.env.SUCCESS,
        message: Messages.OTP_SENT,
      };
    } catch (err) {
      return {
        status: process.env.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async register({ email, password, role, firstName, lastName, phone, address, city, state, country, zipCode }) {
    try {
      const existingUser = await new FindRepo("UserModel").findOne({ email });

      if (existingUser) {
        return {
          status: process.env.BAD_REQUEST,
          message: Messages.EMAIL_ALREADY_EXISTS,
        };
      }

      const hashedPassword = await methods.hashPassword(password);

      const user = await new CreateRepo("UserModel").create({
        email,
        password: hashedPassword,
        role,
        firstName,
        lastName,
        phone,
        address,
        city,
        state,
        country,
        zipCode,
        is_block: false,
        status: true,
        createdAt: new Date(),
      });

      if (!user) {
        throw new Error("Unable to create user");
      }

      return {
        status: process.env.SUCCESS,
        message: Messages.USER_CREATED_SUCCESSFULLY,
        data: {
          user: {
            id: user._id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        },
      };
    } catch (err) {
      return {
        status: process.env.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async refreshToken({ refreshToken }) {
    try {
      const decoded = methods.verifyRefreshToken(refreshToken, process.env.JWT_REFRESH_SECRET);
      
      if (!decoded) {
        return {
          status: process.env.UNAUTHORIZED,
          message: Messages.INVALID_REFRESH_TOKEN,
        };
      }

      const user = await new FindRepo("UserModel").findOne(
        { _id: decoded.id },
        { _id: 1, role: 1, is_block: 1 }
      );

      if (!user || user.is_block) {
        return {
          status: process.env.UNAUTHORIZED,
          message: Messages.USER_NOT_FOUND,
        };
      }

      const newToken = methods.generateToken({ id: user._id, role: user.role });
      const newRefreshToken = methods.generateRefreshToken({ id: user._id, role: user.role });

      return {
        status: process.env.SUCCESS,
        message: Messages.TOKEN_REFRESHED,
        data: {
          token: newToken,
          refreshToken: newRefreshToken,
        },
      };
    } catch (err) {
      return {
        status: process.env.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async logout({ userId }) {
    try {
      await new UpdateRepo("UserModel").updateWithId(userId, {
        lastLogout: new Date(),
      });

      return {
        status: process.env.SUCCESS,
        message: Messages.LOGOUT_SUCCESS,
      };
    } catch (err) {
      return {
        status: process.env.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }
}

export default new AuthService();
