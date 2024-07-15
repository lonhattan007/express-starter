const asyncHandler = require("express-async-handler");
const BikesService = require("../services/bikes.service").getInstance();

var BikesController = {};

BikesController.getBikeById = asyncHandler(async (req, res, next) => {
  const result = BikesService.getBikeById(parseInt(req.params.bikeId));

  if (result.success) {
    res.status(200);
    res.send(result);
  } else {
    next();
  }
});

BikesController.getBikesWithQuery = asyncHandler(async (req, res, next) => {
  let query = req.query;
  query.page = query.page || 1;

  const result = BikesService.getBikesWithQuery(query);

  if (result.success) {
    res.status(200);
    res.send(result);
  } else {
    next();
  }
});

BikesController.addBike = asyncHandler(async (req, res, next) => {
  const payload = req.body.payload;

  const result = BikesService.addBike(payload);

  res.status(201);
  res.send({
    ...result,
    message: `Successfully create bike no ${result.data.id}`,
  });
});

BikesController.updateBike = asyncHandler(async (req, res, next) => {
  const bikeId = parseInt(req.params.bikeId);
  const payload = req.body.payload;

  const result = BikesService.updateBike(bikeId, payload);

  if (result.success) {
    res.status(200);
    res.send({
      ...result,
      message: `Successfully update bike no ${bikeId}`,
    });
  } else {
    next();
  }
});

BikesController.deleteBike = asyncHandler(async (req, res, next) => {
  const bikeId = parseInt(req.params.bikeId);

  const result = BikesService.deleteBike(bikeId);

  if (result.success) {
    res.status(204);
    res.send({
      ...result,
      message: `Successfully delete bike no ${bikeId}`,
    });
  } else {
    next();
  }
});

module.exports = BikesController;
