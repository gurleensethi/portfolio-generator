const express = require("express");

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.render("home", { styles: ["home"] });
});

module.exports = homeRouter;
