const express = require("express");
const path = require("path");
const templateRoutes = require("./routes/portfolios.router");
const homeRoutes = require("./routes/home.router");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, "templates")));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  exphbs({
    helpers: {
      debug(data) {
        console.log(data);
        return "";
      },
    },
  })
);

// Setup routes
app.use(homeRoutes);
app.use("/portfolios", templateRoutes);

app.listen(PORT, (err) => {
  if (err) return console.error(err);
  console.log(`🚀 Running on port ${PORT}...`);
});
