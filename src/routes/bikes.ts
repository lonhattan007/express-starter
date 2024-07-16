import { Router } from "express";
import { param, query } from "express-validator";
import BikesController from "../controllers/bikes.controller";

const router: Router = Router();

const bikeIdParamSanitizer = (value: string) => parseInt(value);
const pageQuerySanitizer = (value: string | undefined) =>
  value ? parseInt(value) : 1;

/* GET bikes routes */
router.get(
  "/:bikeId",
  param("bikeId").customSanitizer(bikeIdParamSanitizer),
  BikesController.getBikeById,
);

router.get(
  "/",
  query("page").customSanitizer(pageQuerySanitizer),
  query("pageSize").customSanitizer(pageQuerySanitizer),
  BikesController.getBikesWithQuery,
);

/* POST bikes routes */
router.post("/", BikesController.addBike);

/* PUT bikes routes */
router.put(
  "/:bikeId",
  param("bikeId").customSanitizer(bikeIdParamSanitizer),
  BikesController.updateBike,
);

/* DELETE bikes routes */
router.delete(
  "/:bikeId",
  param("bikeId").customSanitizer(bikeIdParamSanitizer),
  BikesController.deleteBike,
);

export default router;
