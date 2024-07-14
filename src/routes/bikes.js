var express = require("express");
var router = express.Router();
const BikesController = require("../controllers/bikes.controller");

/* GET bikes routes */
router.get("/:bikeId", BikesController.getBikeById);

router.get("/", BikesController.getBikesWithQuery);

/* POST bikes routes */
router.post("/", BikesController.addBike);

/* PUT bikes routes */
router.put("/:bikeId", BikesController.updateBike);

/* DELETE bikes routes */
router.delete("/:bikeId", BikesController.deleteBike);

module.exports = router;
