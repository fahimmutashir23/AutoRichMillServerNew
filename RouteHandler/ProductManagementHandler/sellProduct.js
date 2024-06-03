const express = require("express");
const SellProduct = require("../../Schemas/ProductManagement/sellProduct");
const router = express.Router();

// get all purchase product
router.get("/sell/sell-product/all", async (req, res) => {
  try {
    const result = await SellProduct.find();
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
router.post("/sell/sell-product/create", async (req, res) => {
  const newExpense = new SellProduct(req.body);
  try {
    const result = newExpense.save();
    res.json({
      id: result._id,
      message: "Sell Product product Create Successfully",
      status_code: 200,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// purchase product edit
router.patch("/sell/sell-product/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await SellProduct.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!result) {
      return res
        .status(404)
        .json({ message: "Expense purchase product not found" });
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

router.delete("/sell/sell-product/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await SellProduct.findByIdAndDelete(id);
    if (!result) {
      return res
        .status(404)
        .json({ message: "Expense purchase product not found" });
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
