const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "",
      title: "Tripy API",
      description:
        "프로젝트 설명 Node.js Swaager swagger-jsdoc 방식 RestFul API 클라이언트 UI",
    },

    servers: [
      {
        url: "http://tripy.site:5000", // 요청 URL
      },
      {
        url: "http://52.79.126.200:5000",
      },
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/*.js", "./src/api/**/*.js", "./src/auth/**/*.js"], //Swagger 파일 연동
};
const specs = swaggereJsdoc(options);

module.exports = { swaggerUi, specs };
