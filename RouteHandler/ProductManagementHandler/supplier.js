const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Supplier = require("../../Schemas/ProductManagement/supplier");

router.get("/get-supplier", async (req, res) => {
  try {
    const result = await Supplier.find();
    //send response
    res.status(200).json({
      success: true,
      message: "supplier get successfully",
      data: result,
    });
  } catch (error) {
    res.json(error);
  }
});
router.get("/get-single-supplier/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await Supplier.findOne(filter);
    res.json({
      status_code: 200,
      message: "Successfully Loaded Data",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});
router.post("/create-supplier", async (req, res) => {
  const newSupplier = new Supplier(req.body);
  console.log(newSupplier);
  try {
    const result = newSupplier.save();
    res.status(200).json({
      success: true,
      message: "Supplier post successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//update
router.patch("/update-supplier/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await Supplier.findByIdAndUpdate(id, updates, { new: true });
    if (!result) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json({
      status_code: 200,
      message: "Supplier Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete
router.delete("/delete-supplier/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Supplier.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json({
      status_code: 200,
      message: "Supplier Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
