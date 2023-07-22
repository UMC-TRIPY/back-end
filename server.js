const express = require("express");
const cors = require("cors");

const { swaggerUi, specs } = require("./swagger/swagger");
const PORT = process.env.PORT || 5000;

var mysql = require('mysql');
const db = require('./lib/database')

require("dotenv").config();

//const PORT = process.env.PORT || 5000;
const port = 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", require("./src"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//rds connect
const database = require('./module/db_connect');
const conn = database.conn();


 app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
 });




 