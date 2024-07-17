import { Request, Response, NextFunction } from "express";

import BikesService from "@/services/bikes.service";
import { GetBikesQuery } from "@/types/GetBikesQuery";
import { BikeDTO } from "@/dtos/BikeDTO";
import createHttpError from "http-errors";
import { Result, validationResult } from "express-validator";

const bikesService = BikesService.getInstance();

class BikesController {
  private static handleValidation(req: Request, res: Response) {
    const errors: Result = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({
        success: false,
        error: `Bad request: ${errors.array({ onlyFirstError: true })[0].msg}`,
      });
    }
  }

  static getBikeById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    BikesController.handleValidation(req, res);

    const bikeId = parseInt(req.params.bikeId);
    const result = bikesService.getBikeById(bikeId);

    if (result.success) {
      res.status(200);
      res.send(result);
    } else {
      next();
    }
  };

  static getBikesWithQuery = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    BikesController.handleValidation(req, res);

    const query: GetBikesQuery = req.query;

    const result = bikesService.getBikesWithQuery(query);

    if (result.success) {
      res.status(200);
      res.send(result);
    } else {
      next(createHttpError(400, result.error!));
    }
  };

  static addBike = async (req: Request, res: Response, next: NextFunction) => {
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

  static updateBike = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    BikesController.handleValidation(req, res);

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

  static deleteBike = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    BikesController.handleValidation(req, res);

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
}

export default BikesController;
