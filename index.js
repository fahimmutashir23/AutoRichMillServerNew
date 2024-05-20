const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

const userHandler = require("./RouteHandler/UserHandler/userHandler");
const expenseHandler = require("./RouteHandler/ExpenseHandler/expenseHandler");
const categoryHandler = require("./RouteHandler/CategoryHandler/categoryHandler");
const clientHandler = require("./RouteHandler/ClientHandler/clientHandler");
const serviceCategoryHandler = require("./RouteHandler/ServiceCategoryHandler/serviceCategoryHandler");
const serviceHandler = require("./RouteHandler/ServiceCategoryHandler/serviceList");
require("dotenv").config();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.CONNECTION_URI)
  .then(() => console.log("Database Connect Successfully"))
  .catch((err) => console.log(err));

app.use("/api", userHandler);
app.use("/api", expenseHandler);
app.use("/api", categoryHandler);
app.use("/api", clientHandler);
app.use("/api", serviceCategoryHandler);
app.use("/api", serviceHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Mill is running on port ${port}`);
});
