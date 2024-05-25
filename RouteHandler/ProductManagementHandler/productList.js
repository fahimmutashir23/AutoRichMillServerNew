const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const ProductList = require("../../Schemas/ProductManagement/productList");

router.get("/get-productList", async (req, res) => {
  try {
    const result = await ProductList.find();
    //send response
    res.status(200).json({
      success: true,
      message: "Product List get successfully",
      data: result,
    });
  } catch (error) {
    res.json(error);
  }
});
router.get("/get-single-productList/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await ProductList.findOne(filter);
    res.json({
      status_code: 200,
      message: "Successfully Loaded Data",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});
router.post("/create-productList", async (req, res) => {
  const newProductList = new ProductList(req.body);
  console.log(newProductList);
  try {
    const result = newProductList.save();
    res.status(200).json({
      success: true,
      message: "Product List post successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//update
router.patch("/update-product List/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await ProductList.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Product List not found" });
    }
    res.json({
      status_code: 200,
      message: "Product List Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete
router.delete("/delete-productList/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ProductList.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Product List not found" });
    }
    res.json({
      status_code: 200,
      message: "Produc tList Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
