const express = require("express");
const mongoose = require("mongoose");

const { connect, disconnect } = require("./data/controllers/connection.js");
const { addMiddlewares } = require("./middleware/middleware.js");

const app = express();
const PORT = 4000;

// middlewares
addMiddlewares(app);

// API routes
// 3. TODO : add API routes (express.Router)

async function main() {
  try {
    // 1. TODO: connect to database
    if (connection.state === "connected") {
      console.log(`Connected to '${connection.database}' database!`);

      // Start the server
      app.listen(PORT, () => {
        console.log(`Server is listening on http://localhost:${PORT}`);
      });
    }
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
}

main();
