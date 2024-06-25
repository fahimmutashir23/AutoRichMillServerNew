const express = require("express");
const router = express.Router();
const loginCheck = require("../../../Middleware/checkLogin");
const ServiceCategory = require("../../../Schemas/Services/categoryList");

router.get("/get-serviceCategory", async (req, res) => {
  try {
    const result = await ServiceCategory.find();
    //send response
    res.status(200).json({
      success: true,
      message: "Service Category Get successfully",
      data: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.post("/create-serviceCategory", async (req, res) => {
  const newServiceCategory = new ServiceCategory(req.body);

  try {
    const result = newServiceCategory.save();
    res.status(200).json({
      success: true,
      message: "Service Category Post successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//update
router.patch("/update-serviceCategory/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await ServiceCategory.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Service Category not found" });
    }
    res.json({
      status_code: 200,
      message: "ServiceCategory Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete
router.delete("/delete-serviceCategory/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ServiceCategory.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Service Category not found" });
    }
    res.json({
      status_code: 200,
      message: "Service Category Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
