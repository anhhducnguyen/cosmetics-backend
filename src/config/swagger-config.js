const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cosmetics sales website",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js", "./src/*.js"], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

module.exports = openapiSpecification;
