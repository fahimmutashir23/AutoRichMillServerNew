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
const branchHandler = require("./RouteHandler/BranchHandler/branchHandler");
const providerHandler = require("./RouteHandler/ProviderHandler/provider");
const paymentHandler = require("./RouteHandler/PaymentTypeHandler/paymentType");
const invoiceTermsHandler = require("./RouteHandler/InvoiceTermsHandler/invoiceTerms");
const supplierHandler = require("./RouteHandler/ProductManagementHandler/supplier");
const productCategoryHandler = require("./RouteHandler/ProductManagementHandler/productCategory");
const productListHandler = require("./RouteHandler/ProductManagementHandler/productList");
const PurchaseProductHandler = require("./RouteHandler/ProductManagementHandler/purchaseProduct");
const InvoiceHandler = require("./RouteHandler/InvoiceHandler/Invoice");
require("dotenv").config();
app.use("/images", express.static("images"));
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
app.use("/api", supplierHandler);
app.use("/api", productCategoryHandler);
app.use("/api", productListHandler);
app.use("/api", PurchaseProductHandler);
app.use("/api", InvoiceHandler);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Mill is running on port ${port}`);
});
