require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var documentRouter = require("./routes/doc");
var bikesRouter = require("./routes/bikes");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/doc", documentRouter);
app.use("/bikes", bikesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  const message = err.message;

  res.locals.message = message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // return the error
  res.status(err.status || 500);
  res.send({
    status: err.status,
    error: message,
    message: "No resource matches the requested URI",
  });
});

module.exports = app;
