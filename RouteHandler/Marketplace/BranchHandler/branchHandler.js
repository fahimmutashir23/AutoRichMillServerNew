const express = require("express");
const router = express.Router();
const loginCheck = require("../../../Middleware/checkLogin");
const Branch = require("../../../Schemas/Branch/branch");

router.post("/create-branch", async (req, res) => {
  const newBranch = new Branch(req.body);
  try {
    const result = await newBranch.save();
    console.log(result);
    res.json({
      status_code: 200,
      message: "Branch Create Successfully",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/get-branch", async (req, res) => {
  try {
    const result = await Branch.find();
    res.json({
      status_code: 200,
      message: "Successfully Loaded Data",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/get-single-branch/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await Branch.findOne(filter);
    res.json({
      status_code: 200,
      message: "Successfully Loaded Data",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.patch("/update-branch/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const updates = req.body;
    console.log(updates);
    const result = await Branch.findByIdAndUpdate(id, updates, { new: true });
    if (!result) {
      return res.status(404).json({ message: "branch not found" });
    }
    res.json({
      status_code: 200,
      message: "branch Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-branch/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await Branch.findOneAndDelete(filter);
    res.json({
      status_code: 201,
      message: "Branch Delete Successfully",
      data: result,
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
