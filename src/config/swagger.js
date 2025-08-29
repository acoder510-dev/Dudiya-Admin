import swaggerJSDoc from "swagger-jsdoc";
import config from "./config.js";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Dudiya App",
    description: "Dudiya API",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  servers: [
    {
      url: `${config.SWAGGER_API_URL}/api/v1`,
    },
    // {
    // url: `https://dudiya-backend.onrender.com/api/v1`,
    // },
    // {
    //   url: `http://localhost:{port}/api/v1/`,
    //   variables: {
    //     port: {
    //       default: "8000",
    //     },
    //   },
    // },
  ],
};

// options for the swagger docs
const options = {
  failOnErrors: true,
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ["./src/docs/*.yml"],
};

// initialize swagger-jsdoc
export default swaggerJSDoc(options);
