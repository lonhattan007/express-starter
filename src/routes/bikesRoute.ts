import { Router } from "express";
import { param, query } from "express-validator";
import { isInt } from "validator";
import BikesController from "@/controllers/bikes.controller";

const router: Router = Router();

const parseIntSanitizer = (value: string) => {
  return isInt(value) ? parseInt(value) : 0;
};

const pageQuerySanitizer = (value: string | undefined) =>
  value ? parseInt(value) : 1;

/* GET bikes routes */
router.get(
  "/:bikeId",
  param("bikeId").customSanitizer(parseIntSanitizer),
  BikesController.getBikeById,
);

router.get(
  "/",
  query("page").customSanitizer(pageQuerySanitizer),
  query("pageSize").notEmpty(),
  query("pageSize").customSanitizer(parseIntSanitizer),
  BikesController.getBikesWithQuery,
);

/* POST bikes routes */
router.post("/", BikesController.addBike);

/* PUT bikes routes */
router.put(
  "/:bikeId",
  param("bikeId").customSanitizer(parseIntSanitizer),
  BikesController.updateBike,
);

/* DELETE bikes routes */
router.delete(
  "/:bikeId",
  param("bikeId").customSanitizer(parseIntSanitizer),
  BikesController.deleteBike,
);

export default router;
