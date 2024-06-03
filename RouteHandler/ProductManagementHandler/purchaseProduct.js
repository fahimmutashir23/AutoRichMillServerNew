const express = require("express");
const PurchaseProduct = require("../../Schemas/ProductManagement/purchaseProduct");
const router = express.Router();

// get all purchase product
router.get("/product/purchase-product/all", async (req, res) => {
    try {
      const result = await PurchaseProduct.find();
      res.json({
        status_code: 200,
        message: "Successfully Loaded Data",
        result: result,
      });
    } catch (error) {
      res.json(error);
    }
  });
  
  // create purchase product
  router.post("/product/purchase-product/create", async (req, res) => {
    const newExpense = new PurchaseProduct(req.body);
    try {
      const result = newExpense.save();
      res.json({
        id: result._id,
        message: "Expense purchase product Create Successfully",
        status_code: 200,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });
  
  // purchase product edit
  router.patch("/product/purchase-product/update/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const result = await PurchaseProduct.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!result) {
        return res.status(404).json({ message: "Expense purchase product not found" });
      }
      res.json({
        status_code: 200,
        message: "Expense purchase product Updated Successfully",
        result: result,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // purchase product Delete
  
  router.delete("/product/purchase-product/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await PurchaseProduct.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ message: "Expense purchase product not found" });
      }
      res.json({
        status_code: 200,
        message: "Expense purchase product Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  module.exports = router;
