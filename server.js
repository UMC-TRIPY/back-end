require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { swaggerUi, specs } = require("./swagger/swagger");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;
const app = express();

// const bodyParser = require("body-parser");
// const db = require("./module/db_connect");

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "prod") {
    morgan("combined")(req, res, next);
  } else {
    morgan("dev")(req, res, next);
  }
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", require("./src"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//rds connect
// const database = require("./module/db_connect");
// const conn = database.conn();

//404 미들웨어
app.use((req, res, next) => {
  res.status(404).json({ error: "404 Not Found" });
});

//에러처리
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
