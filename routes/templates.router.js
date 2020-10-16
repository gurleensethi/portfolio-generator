const express = require("express");
const { promises: fs } = require("fs");
const path = require("path");
const data = require("../data/data.json");

const templateRouter = express.Router();

templateRouter
  .get("/", async (req, res) => {
    const files = await fs.readdir(path.join(__dirname, "..", "templates"));
    res.json(files);
  })
  .get("/render/:templateId", async (req, res) => {
    const { templateId } = req.params;
    res.render(`${templateId}`, data);
  });

module.exports = templateRouter;
