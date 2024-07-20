import express from "express";
import indexRouter from "../src/routes/index";
import { describe, it } from "@jest/globals";
import request, { Response } from "supertest";
import { HttpError } from "http-errors";

describe("Sample test suite", () => {
  const app = express();
  app.use("/", indexRouter);

  it("GET /", () => {
    request(app)
      .get("/")
      .expect(302) // it is redirected to /bikes
      .end(function (err: HttpError, res: Response) {
        if (err) {
          throw err;
        }

        console.info(res);
      });
  });
});
