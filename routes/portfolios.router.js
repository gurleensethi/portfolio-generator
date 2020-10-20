const express = require("express");
const { promises: fs } = require("fs");
const path = require("path");
const data = require("../data/data.json");

const portfoliosRouter = express.Router();

portfoliosRouter
  .get("/", async (req, res) => {
    const files = await fs.readdir(
      path.join(__dirname, "..", "templates", "portfolios")
    );

    res.render("portfolios/portfolios", {
      portfolios: files.filter((file) => file !== "portfolios.handlebars"),
    });
  })
  .get("/render/:templateId", async (req, res) => {
    const { templateId } = req.params;
    res.render(`portfolios/${templateId}`, {
      templateId,
      layout: "portfolio",
      personal: data,
    });
  });

module.exports = portfoliosRouter;
