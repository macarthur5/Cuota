const express = require("express");
const router = express.Router();
const cuotaController = require("../controllers/cuota");

router.post("*", cuotaController.serve);

module.exports = router;
