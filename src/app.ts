import express, { Express, Request, Response, NextFunction } from "express";
import createHttpError, { HttpError } from "http-errors";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { configDotenv } from "dotenv";
configDotenv();

import indexRouter from "@/routes/index";
import documentRouter from "@/routes/docs";
import bikesRouter from "@/routes/bikes";

const app: Express = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("etag", "strong");

app.use("/", indexRouter);
app.use("/docs", documentRouter);
app.use("/bikes", bikesRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createHttpError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // set locals, only providing error in development
  const message = err.message;

  res.locals.message = message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // return the error
  res.status(err.status || 500);
  res.send({
    status: err.status,
    error: message,
    // message: "No resource matches the requested URI",
  });
});

export default app;
