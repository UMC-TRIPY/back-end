require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { swaggerUi, specs } = require("./swagger/swagger");
const PORT = process.env.PORT || 5000;

const bodyParser = require("body-parser");
const db = require("./module/db_connect");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", require("./src"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//rds connect
// const database = require("./module/db_connect");
// const conn = database.conn();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
