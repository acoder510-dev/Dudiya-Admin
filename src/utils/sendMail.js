import nodemailer from "nodemailer";
import config from "../config/config.js";
import logger from "./logger.js";
import { Template } from "./mailTemplate.js";

const frontend_url = config.FRONTEND_URL;

class Mailer {
  async sendMail(to = null, type, data, from = null) {
    let subject = `New Message Received`;
    let html = `<h1>Dudiya</h1>`;
    let attachments = [];
    let attachmentsNew = null;
    let cc;
    switch (type) {
      case "welcome":
        subject = `Welcome To Dudiya`;
        html = Template[type](data);
        break;
      case "loginEmail":
        subject = `Login OTP`;
        html = Template[type](data);
        break;
      case "forgotEmail":
        subject = `Reset Email OTP`;
        html = Template[type](data);
        break;
        subject = `Users Report`;
        html = "PFA the all users registered on website";
        attachmentsNew = [
          {
            path: `${data.filePath}`,
          },
        ];
        cc = data.cc;
        break;
      default:
        subject = `New Message Received`;
        html = `<h1>Dudiya</h1>`;
    }

    // Nodemailer Configuration...

    // // For testing purpose
    // const testAccount = await nodemailer.createTestAccount();

    // let transporter = nodemailer.createTransport({
    //   host: testAccount.smtp.host,
    //   port: testAccount.smtp.port,
    //   auth: {
    //     user: testAccount.user,
    //     pass: testAccount.pass,
    //   },
    // });

    let transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      service: config.SMTP_SERVICE,
      secureConnection: false,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
      },
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
    });
    let msg = {
      to: to || config.SMTP_USER,
      from: config.SMTP_USER,
      subject: subject,
      html: html,
    };
    if (attachments) {
      msg = {
        ...msg,
        // attachments: [
        //   ...attachments,
        //   {
        //     path: `${frontend_url}/assets/images/dudiya.svg`,
        //     cid: "dudiyalogo",
        //   },
        // ],
      };
    }
    if (attachmentsNew) {
      msg = {
        ...msg,
        attachments: [...attachmentsNew],
      };
    }
    if (cc) {
      msg["cc"] = cc;
    }
    // console.log("msg",msg)
    try {
      let info = await transporter.sendMail(msg);
      // console.log("info",info)
      if (!info) throw new Error(`Unable to send Mail`);
      return true;
    } catch (error) {
      logger.error(`Mail Send Error: ${error}`);
      console.log(error);
      return false;
    }
  }
}

export default new Mailer();
