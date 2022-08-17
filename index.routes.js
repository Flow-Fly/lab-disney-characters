const express = require("express");
const app = express.Router();
const charactersRoute = require("./characters.routes.js");
app.get("/", (request, response) => {
  response.send("Disney Lab");
});

app.use("/", charactersRoute);

module.exports = app;
