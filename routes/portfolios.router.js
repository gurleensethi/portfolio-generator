const express = require("express");
const fs = require("fs");
const path = require("path");
const data = require("../data/data.json");
const archiver = require("archiver");

const portfoliosRouter = express.Router();

portfoliosRouter
  .get("/", async (req, res) => {
    const files = await fs.promises.readdir(
      path.join(__dirname, "..", "templates", "portfolios")
    );

    res.render("portfolios", {
      portfolios: files.map((file) => file.split("-").join(" ").toUpperCase()),
      styles: ["portfolios"],
    });
  })
  .get("/render/:templateId", async (req, res) => {
    const { templateId } = req.params;
    res.render(`portfolios/${templateId}`, {
      templateId,
      layout: "portfolio",
      personal: data,
    });
  })
  .get("/generate/:templateId", async (req, res) => {
    try {
      const { templateId } = req.params;

      const templateStylesPath = path.join(
        global.appRoot,
        "templates",
        "portfolios",
        templateId,
        "styles.css"
      );

      /** Generate files from template **/
      const content = await new Promise((resolve, reject) => {
        res.render(
          `portfolios/${templateId}`,
          {
            personal: data,
            templateId,
            layout: "portfolio",
            isProduction: true,
          },
          (err, html) => resolve(html)
        );
      });

      /** Creating files **/
      const uniqueKey = `${Date.now()}_${Math.floor(
        Math.random() * 1000
      )}_${templateId}`;
      const tempFolderPath = path.join(global.appRoot, "_generated", uniqueKey);
      await fs.promises.mkdir(tempFolderPath, { recursive: true });
      const zipFilePath = path.join(tempFolderPath, "website.zip");
      const output = fs.createWriteStream(zipFilePath);
      const fileArchiver = archiver("zip");
      output.on("close", async () => {
        res.download(zipFilePath);
        await fs.promises.rmdir(tempFolderPath, { recursive: true });
      });
      fileArchiver.pipe(output);
      fileArchiver.append(content, { name: "index.html" });
      fileArchiver.append(fs.createReadStream(templateStylesPath), {
        name: "styles.css",
      });
      fileArchiver.finalize();
    } catch (err) {
      console.log(err);
    }
  });

module.exports = portfoliosRouter;
