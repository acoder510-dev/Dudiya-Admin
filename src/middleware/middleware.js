import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../config/swagger.js";
import methods from "../utils/methods.js";
import FindRepo from "../repo/findRepo.js";
import { Messages } from "../utils/messages.js";

export default class Middleware {
  static init(server) {
    // express middleware
    server.app.use(express.urlencoded({ extended: false }));
    server.app.use(express.json());

    server.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // cors middleware
    var corsOptions = {
      origin: "*",
      optionsSuccessStatus: 200,
    };
    server.app.use(cors(corsOptions));
    server.app.use((req, res, next) => {
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, HEAD, PATCH, PUT, DELETE, OPTIONS "
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With," +
          " Content-Type, Accept," +
          " Authorization," +
          " Access-Control-Allow-Credentials"
      );
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });
  }
  async isAuthenticatedUser(req, res, next) {
    try{
      if (!req.headers.authorization) {
        return res
          .status(process.env.UNAUTHORISED)
          .json({ success: false, message: Messages.AUTH_ERROR });
      }

    const Authtoken = req.headers.authorization.split(' ')[1];
   

    if (!Authtoken) {
      return res
        .status(process.env.UNAUTHORISED)
        .json({ Success: false, message: Messages.PLEASE_LOGIN });
    }

    let {id} = methods.verifyToken(Authtoken);
  

    if (!id) {
      return res
        .status(process.env.UNAUTHORISED)
        .json({ Success: false, message: Messages.TOKEN_EXPIRY });
    }
    
   
    let result = await new FindRepo("UserModel").findById(id);
   
  
    if (!result)
      return res
        .status(process.env.UNAUTHORISED)
        .json({ Success: false, message: Messages.UNAUTHORIZED_TOKEN });

    if (result.status) {
      req.user = result;
      next();
    } else {
      return res
        .status(process.env.UNAUTHORISED)
        .json({ Success: false, message: Messages.ACCOUNT_UNVERIFIED });
    }
  }catch (err) {
    return res
        .status(process.env.UNAUTHORISED)
        .json({ Success: false, message:err });

  }
  }
  authorizeRoles(...roles) {
    return (req, res, next) => {
      if (!roles.includes(req?.user?.role)) {
        return res
          .status(process.env.FORBIDDEN)
          .json({ Success: false, message: Messages.ROLE_NOT_ALLOWED });
      }

      next();
    };
  }
}
