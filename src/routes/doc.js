const router = require("express").Router();
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../../docs/swagger.json");

var options = {
  explorer: true,
};

router.use("/", swaggerUI.serve);
router.get("/", swaggerUI.setup(swaggerDocument, options));

module.exports = router;

