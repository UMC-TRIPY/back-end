const express = require("express");
const cors = require("cors");
var mysql = require('mysql');
const db = require('./lib/database')

require("dotenv").config();

//const PORT = process.env.PORT || 5000;
const port = 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", require("./src"));

//rds connect
const database = require('./module/db_connect');
const conn = database.conn();


 app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
 });




 