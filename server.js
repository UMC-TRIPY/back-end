const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const { swaggerUi, specs } = require("./swagger/swagger");
const PORT = process.env.PORT || 5000;

var mysql = require('mysql');
const db = require('./module/db_connect')


require("dotenv").config();

//const PORT = process.env.PORT || 5000;
const port = 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", require("./src"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


db.conn();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

