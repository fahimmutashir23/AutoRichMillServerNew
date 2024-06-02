const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const InvoiceTerms = require("../../Schemas/InvoiceTerms/invoiceTerms");

router.get("/get-invoiceTerms", async (req, res) => {
  try {
    const result = await InvoiceTerms.find();
    //send response
    res.status(200).json({
      success: true,
      message: "Invoice Terms get successfully",
      data: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/get-single-invoiceTerms/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await InvoiceTerms.findOne(filter);
    res.json({
      status_code: 200,
      message: "Successfully Loaded Data",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.post("/create-invoiceTerms", async (req, res) => {
  const newInvoiceTerms = new InvoiceTerms(req.body);
  console.log(newInvoiceTerms);
  try {
    const result = newInvoiceTerms.save();
    res.status(200).json({
      success: true,
      message: "Invoice Terms post successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.patch("/update-invoiceTerms/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await InvoiceTerms.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Invoice Terms not found" });
    }
    res.json({
      status_code: 200,
      message: "Invoice Terms Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-invoiceTerms/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await InvoiceTerms.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Invoice Terms not found" });
    }
    res.json({
      status_code: 200,
      message: "Invoice Terms Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
