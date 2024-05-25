const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const ProductCategory = require("../../Schemas/ProductManagement/productCategory");
const productCategory = require("../../Schemas/ProductManagement/productCategory");

router.post("/create-productCategory", async (req, res) => {
  const newProductCategory = new ProductCategory(req.body);
  try {
    const result = await newProductCategory.save();
    console.log(result);
    res.json({
      status_code: 200,
      message: "Product Category Create Successfully",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/get-productCategory-list", async (req, res) => {
  try {
    const result = await ProductCategory.find();
    res.json({
      status_code: 200,
      message: "Successfully Loaded Data",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/get-single-productCategory/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await ProductCategory.findOne(filter);
    res.json({
      status_code: 200,
      message: "Successfully Loaded Data",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

//update
router.patch("/update-productCategory/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await productCategory.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json({
      status_code: 200,
      message: "Product Category Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/delete-productCategory/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await ProductCategory.findOneAndDelete(filter);
    res.json({
      status_code: 201,
      message: "Product Category Delete Successfully",
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
