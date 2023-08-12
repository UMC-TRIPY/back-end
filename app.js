require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { swaggerUi, specs } = require("./swagger/swagger");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const db = require("./module/db_connect");

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "prod") {
    morgan("combined")(req, res, next);
  } else {
    morgan("dev")(req, res, next);
  }
});

//다른 도메인간 쿠키 공유
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/api", require("./src"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//rds connect
// const database = require("./module/db_connect");
// const conn = database.conn();

//google Oauth test code
// app.get("/signup", (req, res) => {
//   console.log("sign up");
//   let url = "https://accounts.google.com/o/oauth2/v2/auth";
//   url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`;
//   (url += `&redirect_uri=http://localhost:5000/api/auth/google`),
//     (url += "&response_type=code");
//   url += "&scope=email profile";
//   res.redirect(url);
// });

//에러처리
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
