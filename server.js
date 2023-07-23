const express = require("express");
const cors = require("cors");

<<<<<<< HEAD
=======
const { swaggerUi, specs } = require("./swagger/swagger");
const PORT = process.env.PORT || 5000;

var mysql = require('mysql');
const db = require('./lib/database')
>>>>>>> ed9c6a408cb100c4897515c7bb05f3ad010efb7e

require("dotenv").config();

//const PORT = process.env.PORT || 5000;
const port = 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", require("./src"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

<<<<<<< HEAD
db.conn();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
=======
//rds connect
const database = require('./module/db_connect');
const conn = database.conn();


 app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
 });




 
>>>>>>> ed9c6a408cb100c4897515c7bb05f3ad010efb7e
