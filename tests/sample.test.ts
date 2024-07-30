import express from "express";
import indexRouter from "@/routes/index";
import { describe, it } from "@jest/globals";
import request from "supertest";

describe("Sample test suite", () => {
  const app = express();
  app.use("/", indexRouter);

  it("GET /", (done) => {
    const res = request(app)
      .get("/")
      .expect(302) // it is redirected to /bikes
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      });
  });
});
