var express = require("express");
var router = express.Router();
const param = require("express-validator").param;
const query = require("express-validator").query;
const BikesController = require("../controllers/bikes.controller");

/* GET bikes routes */
router.get(
  "/:bikeId",
  param("bikeId").customSanitizer((value) => parseInt(value)),
  BikesController.getBikeById,
);

router.get(
  "/",
  query("page").customSanitizer((value) => (value ? parseInt(value) : 1)),
  BikesController.getBikesWithQuery,
);

/* POST bikes routes */
router.post("/", BikesController.addBike);

/* PUT bikes routes */
router.put(
  "/:bikeId",
  param("bikeId").customSanitizer((value) => parseInt(value)),
  BikesController.updateBike,
);

/* DELETE bikes routes */
router.delete(
  "/:bikeId",
  param("bikeId").customSanitizer((value) => parseInt(value)),
  BikesController.deleteBike,
);

module.exports = router;
