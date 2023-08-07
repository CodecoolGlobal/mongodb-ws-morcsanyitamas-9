const mongoose = require("mongoose");
const path = require("path");
const TodoModel = require("../models/Todo.js");

require("dotenv").config({
  path: path.join(__dirname, "../../config/.env"),
});
const { MONGO_URL, USERNAME, PASSWORD, CLUSTER, DBNAME } = process.env;

async function connect() {
  const connectionString = createConnectionString();
  const state = await mongoose.connect(connectionString);
  return {
    state: mongoose.STATES[state.connection.readyState],
    database: DBNAME,
  };
}

function createConnectionString() {
  // 2. TODO: create connection string
}

function disconnect() {
  mongoose.disconnect();
  console.log("disconnected");
}

module.exports = {
  connect,
  disconnect
};
