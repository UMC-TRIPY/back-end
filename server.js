const express = require("express");
const cors = require("cors");


require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", require("./src"));

db.conn();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
