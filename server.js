const express = require("express");
const path = require("path");
const templatesApi = require("./routes/templates.router");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, "templates")));
app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs());

// Setup api's
app.use("/templates", templatesApi);

app.listen(PORT, (err) => {
  if (err) return console.error(err);
  console.log(`🚀 Running on port ${PORT}...`);
});
