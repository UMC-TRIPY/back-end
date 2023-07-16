const express = require("express");
const cors = require("cors");
const mysqlConnection = require("./config/mysql.config");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

mysqlConnection.query("show tables", (row) => console.log(row));
app.use(cors());
app.use(express.json());
app.use("/api", require("./src"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
