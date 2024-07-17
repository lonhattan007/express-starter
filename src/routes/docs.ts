import { Router } from "express";
import swaggerUI, { SwaggerUiOptions } from "swagger-ui-express";
import swaggerDocument from "@docs/swagger.json";

const router: Router = Router();

const swaggerUiOptions: SwaggerUiOptions = {
  explorer: true,
};

router.use("/", swaggerUI.serve);
router.get("/", swaggerUI.setup(swaggerDocument, swaggerUiOptions));

export default router;
