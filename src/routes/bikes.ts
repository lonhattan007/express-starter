import { Router } from "express";
import BikesController from "@/controllers/bikes.controller";
import {
  bikeIdValidator,
  pageInfoValidator,
} from "@/validators/bikes.validator";
import { DEFAULT_PAGE_SIZE } from "@/constants";

const router: Router = Router();

/* GET bikes routes */
router.get("/:bikeId", bikeIdValidator, BikesController.getBikeById);

router.get(
  "/",
  pageInfoValidator("page", 1),
  pageInfoValidator("pageSize", DEFAULT_PAGE_SIZE),
  BikesController.getBikesWithQuery,
);

/* POST bikes routes */
router.post("/", BikesController.addBike);

/* PUT bikes routes */
router.put("/:bikeId", bikeIdValidator, BikesController.updateBike);

/* DELETE bikes routes */
router.delete("/:bikeId", bikeIdValidator, BikesController.deleteBike);

export default router;
