const express = require("express");
const mongoose = require("mongoose");
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require("cors");
const port = process.env.PORT || 8000;

const userHandler = require("./RouteHandler/UserHandler/userHandler");
const expenseHandler = require("./RouteHandler/ERP/ExpenseHandler/expenseHandler");
const categoryHandler = require("./RouteHandler/Marketplace/CategoryHandler/categoryHandler");
const clientHandler = require("./RouteHandler/Marketplace/ClientHandler/clientHandler");
const serviceCategoryHandler = require("./RouteHandler/Marketplace/ServiceCategoryHandler/serviceCategoryHandler");
const serviceHandler = require("./RouteHandler/Marketplace/ServiceCategoryHandler/serviceList");
const branchHandler = require("./RouteHandler/Marketplace/BranchHandler/branchHandler");
const providerHandler = require("./RouteHandler/Marketplace/ProviderHandler/provider");
const paymentHandler = require("./RouteHandler/ERP/PaymentTypeHandler/paymentType");
const invoiceTermsHandler = require("./RouteHandler/ERP/InvoiceTermsHandler/invoiceTerms");
const roleHandler = require("./RouteHandler/RoleHandler/roleHandler");
const notFound = require("./Utils/notFound");



require("dotenv").config(); 

const UPLOAD_FOLDER = path.join(__dirname, 'images');

// Ensure the uploads directory exists
if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}
app.use("/images", express.static(UPLOAD_FOLDER));
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
app.use("/api", branchHandler);
app.use("/api", providerHandler);
app.use("/api", paymentHandler);
app.use("/api", invoiceTermsHandler);
app.use("/api", roleHandler);



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Marketplace is running on port ${port}`);
});

app.use(notFound);
