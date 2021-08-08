const express = require("express");
const router = express.Router();
const cuotaController = require("../controllers/cuota");

router.get("*", (request, response) => {
  response.sendFile(__dirname + "/static/index.html");
});
router.post("*", cuotaController.serve);

module.exports = router;
