const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Payment = require("../../Schemas/PaymentType/paymentType");

router.get("/get-payment-list", async (req, res) => {
  try {
    const result = await Payment.find();
    //send response
    res.status(200).json({
      success: true,
      message: "Payment get successfully",
      data: result,
    });
  } catch (error) {
    res.json(error);
  }
});
router.get("/get-single-payment/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await Payment.findOne(filter);
    res.json({
      status_code: 200,
      message: "Successfully Loaded Data",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});
router.post("/create-paymentType", async (req, res) => {
  const newPayment = new Payment(req.body);
  console.log(newPayment);
  try {
    const result = newPayment.save();
    res.status(200).json({
      success: true,
      message: "Payment post successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//update
router.patch("/update-paymentType/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await Payment.findByIdAndUpdate(id, updates, { new: true });
    if (!result) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json({
      status_code: 200,
      message: "Payment Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete
router.delete("/delete-payment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Payment.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json({
      status_code: 200,
      message: "Payment Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
