import jwt from "jsonwebtoken";
import FindRepo from "../repo/findRepo.js";
import Messages from "../utils/messages.js";

export const UserAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: Messages.UNAUTHORIZED,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await FindRepo.findOne("User", { _id: decoded.id });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User ${Messages.NOT_FOUND}`,
      });
    }

    if (
      user.role !== "field_user" &&
      user.role !== "admin" &&
      user.role !== "super_admin"
    ) {
      return res.status(403).json({
        success: false,
        message: Messages.UNAUTHORIZED,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: Messages.UNAUTHORIZED,
    });
  }
};

export const MemberAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: Messages.UNAUTHORIZED,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const member = await FindRepo.findOne("Member", { _id: decoded.id });

    if (!member) {
      return res.status(401).json({
        success: false,
        message: `Member ${Messages.NOT_FOUND}`,
      });
    }

    req.member = member;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: Messages.UNAUTHORIZED,
    });
  }
};

export const AdminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: Messages.UNAUTHORIZED,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await FindRepo.findOne("User", { _id: decoded.id });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User ${Messages.NOT_FOUND}`,
      });
    }

    if (user.role !== "admin" && user.role !== "super_admin") {
      return res.status(403).json({
        success: false,
        message: Messages.UNAUTHORIZED,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: Messages.UNAUTHORIZED,
    });
  }
};
