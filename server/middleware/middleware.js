const cors = require("cors");
const express = require("express");

function addMiddlewares(app) {
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000", // React developer server
    })
  );

  app.use(logger);
}

function logger(req, res, next) {
  const ts = new Date();
  console.log(`[${ts}]: ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = {
  addMiddlewares,
};
