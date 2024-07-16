import { Request, Response, NextFunction } from "express";
// const asyncHandler = require("express-async-handler");

import BikesService from "../services/bikes.service";
import { GetBikesQuery } from "../types/GetBikesQuery";
// import { Bike } from "@/types/Bike";
import { BikeDTO } from "../dtos/BikeDTO";

const bikesService = BikesService.getInstance();

var BikesController: any = {};

BikesController.getBikeById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bikeId = parseInt(req.params.bikeId);
  const result = bikesService.getBikeById(bikeId);

  if (result.success) {
    res.status(200);
    res.send(result);
  } else {
    next();
  }
};

BikesController.getBikesWithQuery = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const query: GetBikesQuery = req.query;

  const result = bikesService.getBikesWithQuery(query);

  if (result.success) {
    res.status(200);
    res.send(result);
  } else {
    next();
  }
};

BikesController.addBike = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bikeDto: BikeDTO = req.body;

  console.log("Sending post request");
  console.log(bikeDto);

  const result = bikesService.addBike(bikeDto);

  res.status(201);
  res.send({
    ...result,
    message: `Successfully create bike no ${result.data.id}: ${result.data.brand} ${result.data.model}`,
  });
};

BikesController.updateBike = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bikeId = parseInt(req.params.bikeId);
  const bikeDto: BikeDTO = req.body;

  const result = bikesService.updateBike(bikeId, bikeDto);

  if (result.success) {
    res.status(200);
    res.send({
      ...result,
      message: `Successfully update bike no ${bikeId}`,
    });
  } else {
    next();
  }
};

BikesController.deleteBike = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bikeId = parseInt(req.params.bikeId);

  const result = bikesService.deleteBike(bikeId);

  if (result.success) {
    res.status(204);
    res.send({
      ...result,
      message: `Successfully delete bike no ${bikeId}`,
    });
  } else {
    next();
  }
};

export default BikesController;
