const express = require("express");
const app = express();
const homedir = require("os").homedir();
const cuotaRoute = require("./routes/cuota");
var cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.static(__dirname + "/static"));
app.use(express.static(homedir));
app.use("/", cuotaRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running cuota on port 3000`);
});
