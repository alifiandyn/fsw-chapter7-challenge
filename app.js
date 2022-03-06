require("dotenv").config();

const express = require("express");
const app = express();
const sequelize = require("./utils/databaseConnection");
const routes = require("./routes/router");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;

app.set("view engine", "ejs"); // Setting view engine
app.set("views", __dirname + "/views"); // Setting Lokasi views
app.use(express.static(__dirname + "/public/")); // Share semua yang ada di dalam folder public agar bisa diakses
app.use(cookieParser());

// Middleware untuk parsing body
app.use(express.urlencoded({ extended: true })); // Agar API bisa membaca url
app.use(express.json());
app.use(routes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    err: statusCode,
    message: err.message,
  });
});

sequelize
  .sync({
    // alter: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
