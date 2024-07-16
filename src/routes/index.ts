import { Router, Request, Response, NextFunction } from "express";

const router: Router = Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.redirect("/bikes");
});

export default router;
