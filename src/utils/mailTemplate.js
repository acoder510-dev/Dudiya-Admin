import config from "../config/config.js";

const frontend_url = config.FRONTEND_URL;
export const Template = {
  welcome: function (data) {
    console.log("welcome:", data);
    return `
    <!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome | Dudiya</title>
    <style type="text/css">
      a:hover {
        text-decoration: underline !important;
      }
    </style>
  </head>

  <body
    marginheight="0"
    topmargin="0"
    marginwidth="0"
    style="margin: 0px; background-color: #f2f3f8"
    leftmargin="0"
  >
    <div class="main" style="text-align: center; margin-top: 20px">
      <div class="logo">
        <a href="${frontend_url}" title="logo" target="_blank">
          <img
            src="cid:dudiyalogo"
            title="logo"
            alt="logo"
          />
        </a>
      </div>
      <div
        class="content"
        style="
          max-width: 670px;
          color: #455056;
          background: #fff;
          margin: 20px auto 40px;
          padding: 50px;
          border-radius: 3px;
          text-align: center;
          -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
          -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
          box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
        "
      >
        <h1
          style="
            color: #214762;
            font-weight: 500;
            margin: 0;
            font-size: 32px;
            font-family: 'Rubik', sans-serif;
          "
        >
          Welcome to Dudiya!
        </h1>
        <span
          style="
            display: inline-block;
            vertical-align: middle;
            border-bottom: 1px solid #4d4d4d;
            width: 100px;
          "
        ></span>
        <p>Hey ${data.name},</p>
        <p
          style="color: #455056; font-size: 18px; line-height: 24px; margin: 0"
        >
          Your account has been created succesfully on the platform of Kaam
          Keeda.
        </p>
        <h1 style="font-weight: 600; font-size: 25px">
          Thank you to join with us
        </h1>
        <a
          href="${frontend_url}/login"
          style="
            background: #214762;
            text-decoration: none !important;
            font-weight: 500;
            color: #fff;
            text-transform: uppercase;
            font-size: 14px;
            padding: 10px 24px;
            display: inline-block;
            border-radius: 50px;
          "
          >Login Now</a
        >
        <p style="margin-top: 30px; font-style: italic">All the best,</p>
        <strong> Your Dudiya Team</strong>
      </div>
    </div>

    <div class="footer" style="text-align: center; margin: 50px auto">
      <p
        style="
          font-size: 15px;
          color: #214762;
          line-height: 18px;
          margin: 0 0 0;
        "
      >
        &copy; <strong>support@dudiya.com</strong>
      </p>
    </div>
  </body>
</html>
`;
  },
  loginEmail: function (data) {
    console.log("loginEmail:", data);
    return `
    <!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email | Dudiya</title>
    <style type="text/css">
      a:hover {
        text-decoration: underline !important;
      }
    </style>
  </head>

  <body
    marginheight="0"
    topmargin="0"
    marginwidth="0"
    style="margin: 0px; background-color: #f2f3f8"
    leftmargin="0"
  >
    <div class="main" style="text-align: center; margin-top: 50px">
      
      <div
        class="content"
        style="
          max-width: 670px;
          background: #fff;
          margin: 20px auto 40px;
          padding: 50px;
          border-radius: 3px;
          text-align: center;
          -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
          -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
          box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
        "
      >
        <h1
          style="
            color: #214762;
            font-weight: 500;
            margin: 0;
            font-size: 32px;
            font-family: 'Rubik', sans-serif;
          "
        >
          OTP to login
        </h1>
        <h2
          style="
            color: #4d4d4d;
            font-weight: 800;
            margin: 20px 0 0;
            font-size: 25px;
            font-family: 'Rubik', sans-serif;
          "
        >
          ${data.otp}
        </h2>
        <span
          style="
            display: inline-block;
            vertical-align: middle;
            border-bottom: 1px solid #4d4d4d;
            width: 100px;
          "
        ></span>
        <p
          style="color: #455056; font-size: 18px; line-height: 24px; margin: 0"
        >
          is your Dudiya reset password code. This code will expires in 2
          minutes. DO NOT SHARE IT WITH ANYONE.
        </p>
        <a
          href="${frontend_url}"
          style="
            background: #214762;
            text-decoration: none !important;
            font-weight: 500;
            margin-top: 35px;
            color: #fff;
            text-transform: uppercase;
            font-size: 14px;
            padding: 10px 24px;
            display: inline-block;
            border-radius: 50px;
          "
          >Dudiya Team</a
        >
      </div>
    </div>

    <div class="footer" style="text-align: center; margin: 50px auto">
      <p
        style="
          font-size: 15px;
          color: #214762;
          line-height: 18px;
          margin: 0 0 0;
        "
      >
        &copy; <strong>support@dudiya.com</strong>
      </p>
    </div>
  </body>
</html>

    `;
  },
  forgotEmail: function (data) {
    console.log("forgotEmail:", data);
    return `
    <!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Password Email | Dudiya</title>
    <style type="text/css">
      a:hover {
        text-decoration: underline !important;
      }
    </style>
  </head>

  <body
    marginheight="0"
    topmargin="0"
    marginwidth="0"
    style="margin: 0px; background-color: #f2f3f8"
    leftmargin="0"
  >
    <div class="main" style="text-align: center; margin-top: 50px">
      <div class="logo">
        <a href="${frontend_url}" title="logo" target="_blank">
          <img
            src="cid:dudiyalogo"
            title="logo"
            alt="logo"
          />
        </a>
      </div>
      <div
        class="content"
        style="
          max-width: 670px;
          background: #fff;
          margin: 20px auto 40px;
          padding: 50px;
          border-radius: 3px;
          text-align: center;
          -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
          -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
          box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
        "
      >
        <h1
          style="
            color: #214762;
            font-weight: 500;
            margin: 0;
            font-size: 32px;
            font-family: 'Rubik', sans-serif;
          "
        >
          OTP to reset your email
        </h1>
        <h2
          style="
            color: #4d4d4d;
            font-weight: 800;
            margin: 20px 0 0;
            font-size: 25px;
            font-family: 'Rubik', sans-serif;
          "
        >
          ${data.otp}
        </h2>
        <span
          style="
            display: inline-block;
            vertical-align: middle;
            border-bottom: 1px solid #4d4d4d;
            width: 100px;
          "
        ></span>
        <p
          style="color: #455056; font-size: 18px; line-height: 24px; margin: 0"
        >
          is your Dudiya reset password code. This code will expires in 2
          minutes. DO NOT SHARE IT WITH ANYONE.
        </p>
        <a
          href="${frontend_url}"
          style="
            background: #214762;
            text-decoration: none !important;
            font-weight: 500;
            margin-top: 35px;
            color: #fff;
            text-transform: uppercase;
            font-size: 14px;
            padding: 10px 24px;
            display: inline-block;
            border-radius: 50px;
          "
          >Dudiya Team</a
        >
      </div>
    </div>

    <div class="footer" style="text-align: center; margin: 50px auto">
      <p
        style="
          font-size: 15px;
          color: #214762;
          line-height: 18px;
          margin: 0 0 0;
        "
      >
        &copy; <strong>support@dudiya.com</strong>
      </p>
    </div>
  </body>
</html>

    `;
  },
};
