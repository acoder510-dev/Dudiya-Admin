import express from "express";
import { deleteObjectAWS, uploadImages } from "../utils/fileUpload.js";
import AuthRouter from "./authRouter.js";
// import UserRouter from "./userRouter.js";
// import { UserAuth } from "../middleware/authMiddleware.js";
import AdminLocationRouter from "./admin/locationRouter.js";
import AdminDashboardRouter from "./admin/dashboardRouter.js";
import UserRouter from "./userRouter.js";
import MemberRouter from "./memberRouter.js";
import { UserAuth, MemberAuth } from "../middleware/authMiddleware.js";
import AdminMemberRouter from "./admin/memberRouter.js";
import AdminUserRouter from "./admin/userRouter.js";
import AdminAuthRouter from "./admin/authRouter.js";
import AdminFarmRouter from "./admin/farmRouter.js";
import AdminRevenueRouter from "./admin/revenueRouter.js";
import AdminPaypalRouter from "./admin/paypalRouter.js";
import AdminNotificationRouter from "./admin/notificationsRouter.js";
import AdminStaticRouter from "./admin/staticRouter.js";
import MangeSubscriptionRouter from "./admin/managesubscription.js";
import AdminSubscriptionRouter from "./subscription/UserSubscriptionRouter.js";

import AdminSettingRouter from "./admin/settingRouter.js";
import PublicRouter from "./publicRouter.js";

export default class Routes {
  /**
   * @param  {Routes}
   * @returns void
   */
  static init(server) {
    const router = express.Router();

    server.app.use("/", router);

    /**
     * Entry point
     */
    server.app.get("/", (_, res) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        `<div><p><h3>Dudiya Server is working fine at : ${process.env.PORT}</h3><p></div>`
      );
    });

    // Auth Router
    server.app.use("/api/v1/auth", new AuthRouter().router);

    // users
    // server.app.use("/api/v1/user", new UserRouter().router);

    // location

    // User/Member Router
    // server.app.use("/api/v1/user", UserAuth, new UserRouter().router);

    //  ================ Start Admin Router =================
    // User
    server.app.use("/api/v1/user", UserAuth, new UserRouter().router);
    //Member Router
    server.app.use("/api/v1/member", MemberAuth, new MemberRouter().router);

    // Admin Routes
    // users
    server.app.use("/api/v1/admin/user", new AdminUserRouter().router);

    server.app.use("/api/v1/admin/auth", new AdminAuthRouter().router);
    server.app.use(
      "/api/v1/admin/dashboard",
      new AdminDashboardRouter().router
    );
    server.app.use("/api/v1/admin/user", new AdminUserRouter().router);
    server.app.use("/api/v1/admin/member", new AdminMemberRouter().router);
    server.app.use("/api/v1/admin/revenue", new AdminRevenueRouter().router);
    server.app.use("/api/v1/admin/farm", new AdminFarmRouter().router);
    server.app.use("/api/v1/admin/location", new AdminLocationRouter().router);
    server.app.use(
      "/api/v1/admin/notifications",
      new AdminNotificationRouter().router
    );
    server.app.use("/api/v1/admin/settings", new AdminSettingRouter().router);
    server.app.use("/api/v1/admin/paypal", new AdminPaypalRouter().router);
    server.app.use("/api/v1/admin/static", new AdminStaticRouter().router);
    server.app.use(
      "/api/v1/admin/manage-subscription",
      new MangeSubscriptionRouter().router
    );
    //  ================ End Admin Router =================
    server.app.use(
      "/api/v1/subscription",
      new AdminSubscriptionRouter().router
    );
    server.app.use("/api/v1/public", new PublicRouter().router);

    // user Subscription
    // transtion
    // Farm
    // user/subscription

    //  public routes
    //  location,

    // upload router
    server.app.post("/api/v1/upload", uploadImages);

    /**
     * 404 if url not found
     */
    server.app.all("*", (_, res) => {
      res.status(process.env.NOT_FOUND).json({
        success: false,
        message: `API not found.`,
      });
    });

    // Static folder
    server.app.use("/", express.static("public"));
  }
}
