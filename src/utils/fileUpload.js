export let UPLOAD_PATH = "public";
import multer from "multer";
import path from "path";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import logger from "./logger.js";

aws.config.update({
  secretAccessKey: process.env.S3_SECRET_KEY,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const s3 = new aws.S3();

function makeId(ext) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `${result}_${Date.now().toString()}.${ext}`;
}

const uploadAWS = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, {
        fieldName: file.fieldname,
      });
    },
    key: function (req, file, cb) {
      cb(null, makeId(file.originalname.split(".").pop()));
      // cb(null, file.originalname);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).array("image", 10); //number of limitation

export const uploadImages = async (req, res) => {
  uploadAWS(req, res, (error) => {
    if (error) {
      logger.error(`uploadImages Error ${error}`);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      // If File not found
      if (req.files === undefined) {
        res.status(404).json({
          success: false,
          message: `No File Selected`,
        });
      } else {
        // If Success
        let fileArray = req.files,
          fileLocation;
        const images = [];
        for (let i = 0; i < fileArray.length; i++) {
          fileLocation = fileArray[i].location;
          images.push(fileLocation);
        }
        // Save the file name into database
        return res.status(200).json({
          success: true,
          filesArray: fileArray,
          urlsArray: images,
        });
      }
    }
  });
};
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export let upload = multer({ storage: storage });

// Delete Object from S3
export const deleteObjectAWS = async (req, res) => {
  try {
    const s3 = new aws.S3();
    const Key = req.query.url.split("/").pop();
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key,
    };
    s3.deleteObject(params, (err) => {
      if (err) {
        throw new Error(err.message);
      } else
        return res.status(200).json({
          success: true,
          message: `Object Deleted`,
        });
    });
  } catch (error) {
    logger.error(`deleteObjectAWS Error ${error.message}`);
    return res
      .status(process.env.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};
